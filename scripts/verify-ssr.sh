#!/usr/bin/env bash
set -u

BASE="${BASE:-http://localhost:4101}"
BASE="${BASE%/}"
PASS=0
FAIL=0

fetch() {
  RESPONSE="$(curl -sS --compressed --max-time 15 --connect-timeout 5 -A 'Googlebot' "$BASE$1" -w '__STATUS__%{http_code}')" || return 1
  STATUS="${RESPONSE##*__STATUS__}"
  HTML="${RESPONSE%__STATUS__*}"
}

check() {
  local route="$1" needle="$2" title="$3"
  if ! fetch "$route"; then
    echo "[FAIL] $route — falha de conexão"
    FAIL=$((FAIL + 1))
    return
  fi
  local head body title_count og_title_count canonical_count
  head="${HTML%%</head>*}"
  body="$(printf '%s' "$HTML" | awk '!inside { p=index($0,"<div id=\"root\">"); if (!p) next; inside=1; $0=substr($0,p+15) } { s=index($0,"window.__RQ_STATE__"); if (s) { printf "%s",substr($0,1,s-1); exit } print }')"
  title_count="$(printf '%s' "$head" | grep -o '<title>' | wc -l | tr -d ' ')"
  og_title_count="$(printf '%s' "$head" | grep -o 'property="og:title"' | wc -l | tr -d ' ')"
  canonical_count="$(printf '%s' "$head" | grep -o 'rel="canonical"' | wc -l | tr -d ' ')"
  if [ "$STATUS" = "200" ] \
    && printf '%s' "$body" | grep -qF -- "$needle" \
    && printf '%s' "$head" | grep -qF -- "$title" \
    && [ "$title_count" = "1" ] \
    && [ "$og_title_count" = "1" ] \
    && [ "$canonical_count" = "1" ] \
    && printf '%s' "$head" | grep -qF 'property="og:url"' \
    && printf '%s' "$head" | grep -qF 'name="twitter:image"'; then
    echo "[PASS] $route"
    PASS=$((PASS + 1))
  else
    echo "[FAIL] $route — status=$STATUS título=$title_count og=$og_title_count canonical=$canonical_count"
    FAIL=$((FAIL + 1))
  fi
}

check_404() {
  local route="$1"
  if fetch "$route" && [ "$STATUS" = "404" ] && printf '%s' "$HTML" | grep -qi 'name="robots" content="noindex, follow"'; then
    echo "[PASS] $route retorna 404"
    PASS=$((PASS + 1))
  else
    echo "[FAIL] $route deveria retornar 404"
    FAIL=$((FAIL + 1))
  fi
}

check_301() {
  local route="$1" expected="$2"
  local output status redirect
  output="$(curl -sS -o /dev/null -w '%{http_code} %{redirect_url}' "$BASE$route")" || output=""
  status="${output%% *}"
  redirect="${output#* }"
  if [ "$status" = "301" ] && [ "$redirect" = "$BASE$expected" ]; then
    echo "[PASS] $route redireciona para $expected"
    PASS=$((PASS + 1))
  else
    echo "[FAIL] $route deveria redirecionar para $expected"
    FAIL=$((FAIL + 1))
  fi
}

echo "== Verificação de HTML inicial SSR em $BASE =="
check "/" "Transformo estratégia em conteúdos" "Coordenação de Conteúdo"
check "/cv" "Experiência profissional" "CV — Gabriel Danino Basilio"
check "/privacidade" "não há ferramenta de analytics ativa" "Privacidade — Gabriel Danino Basilio"
check "/cases/ragtech-sistema-treinamento" "estrutura de treinamento para a Ragtech" "Ragtech — Sistema de Treinamento"
check "/cases/blocs-presentation" "destino anterior deste projeto" "Blocs Presentation — Case em Atualização"
check "/cases/grupo-ems-cystex" "força de campo do Grupo EMS" "Campanha Cystex — Gabriel Danino Basilio"
check "/cases/roadshow-dpsp" "profissionais do canal farmacêutico" "Roadshow DPSP — Gabriel Danino Basilio"
check "/cases/today-at-apple" "pioneiro do Today at Apple no Brasil" "Today at Apple Brazil — Gabriel Danino Basilio"
check "/cases/trilhas-aprendizagem" "conteúdo e prática em experiências" "Trilhas de Aprendizagem — Gabriel Danino Basilio"
check_301 "/index.html" "/"
check_301 "/cv/" "/cv"
check_404 "/cases/inexistente"
check_404 "/rota-inexistente"

echo "== Resultado: PASS=$PASS FAIL=$FAIL =="
[ "$FAIL" = "0" ]
