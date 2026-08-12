// Direção visual: Arquivo Editorial — o editor expõe controles diretos sem competir com a experiência pública do portfólio.
import { type ChangeEvent, type CSSProperties, useState } from "react";
import { ArrowLeft, Check, ImagePlus, MoveDown, MoveUp, RotateCcw, Save, SlidersHorizontal, Upload } from "lucide-react";
import { defaultSiteConfig, getSiteConfig, resetSiteConfig, saveSiteConfig, type ProjectConfig, type SiteConfig } from "@/data/siteConfig";

function cloneConfig(config: SiteConfig): SiteConfig {
  return JSON.parse(JSON.stringify(config)) as SiteConfig;
}

function readFileAsDataUrl(file: File, callback: (url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(String(reader.result)));
  reader.readAsDataURL(file);
}

export default function Editor() {
  const [config, setConfig] = useState<SiteConfig>(() => cloneConfig(getSiteConfig()));
  const [saved, setSaved] = useState(false);

  const updateProject = (index: number, patch: Partial<ProjectConfig>) => {
    setConfig((current) => ({ ...current, projects: current.projects.map((project, projectIndex) => projectIndex === index ? { ...project, ...patch } : project) }));
    setSaved(false);
  };

  const moveProject = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= config.projects.length) return;
    const projects = [...config.projects];
    [projects[index], projects[nextIndex]] = [projects[nextIndex], projects[index]];
    setConfig((current) => ({ ...current, projects: projects.map((project, projectIndex) => ({ ...project, number: String(projectIndex + 1).padStart(2, "0") })) }));
    setSaved(false);
  };

  const uploadImage = (event: ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = event.target.files?.[0];
    if (file) readFileAsDataUrl(file, callback);
  };

  const editorStyle = { "--primary": config.brand.accent, "--background": config.brand.background, "--foreground": config.brand.foreground } as CSSProperties;

  return (
    <div className="editor-page" style={editorStyle}>
      <header className="editor-header">
        <a href="/" className="editor-back"><ArrowLeft size={16} /> Voltar ao portfólio</a>
        <div className="editor-title"><SlidersHorizontal size={17} /><span>Editor do portfólio</span></div>
        <div className="editor-actions">
          <button className="editor-reset" type="button" onClick={() => { resetSiteConfig(); setConfig(cloneConfig(defaultSiteConfig)); setSaved(false); }}><RotateCcw size={15} /> Restaurar padrão</button>
          <button className="editor-save" type="button" onClick={() => { saveSiteConfig(config); setSaved(true); }}><Save size={15} /> {saved ? "Salvo" : "Salvar alterações"}</button>
        </div>
      </header>

      <main className="editor-main">
        <section className="editor-intro">
          <p className="section-kicker">Personalização local</p>
          <h1>Faça o portfólio<br /><em>ter sua medida.</em></h1>
          <p>Altere fotos, textos, cores, proporções e ordem dos projetos. As mudanças ficam salvas neste navegador e aparecem no portfólio depois de clicar em “Salvar alterações”.</p>
          <div className="editor-note"><span className="status-dot" /> Para publicar uma alteração para todos os visitantes, salve o checkpoint depois de revisar.</div>
        </section>

        <section className="editor-panel" aria-labelledby="identity-title">
          <div className="editor-panel-heading"><span>01</span><div><p className="section-kicker">Identidade</p><h2 id="identity-title">A primeira impressão.</h2></div></div>
          <div className="editor-fields editor-fields-identity">
            <label className="editor-field editor-photo-field"><span>Foto principal</span><div className="editor-photo-preview"><img src={config.profilePhoto} alt="Prévia do perfil" /></div><label className="upload-button"><Upload size={14} /> Trocar foto<input type="file" accept="image/*" onChange={(event) => uploadImage(event, (url) => { setConfig((current) => ({ ...current, profilePhoto: url })); setSaved(false); })} /></label><small>JPG ou PNG. A foto será usada no hero e no CV.</small></label>
            <div className="editor-field-stack">
              <label className="editor-field"><span>Cor de assinatura</span><div className="color-input"><input type="color" value={config.brand.accent} onChange={(event) => { setConfig((current) => ({ ...current, brand: { ...current.brand, accent: event.target.value } })); setSaved(false); }} /><input value={config.brand.accent} onChange={(event) => { setConfig((current) => ({ ...current, brand: { ...current.brand, accent: event.target.value } })); setSaved(false); }} /></div></label>
              <label className="editor-field"><span>Cor de fundo</span><div className="color-input"><input type="color" value={config.brand.background} onChange={(event) => { setConfig((current) => ({ ...current, brand: { ...current.brand, background: event.target.value } })); setSaved(false); }} /><input value={config.brand.background} onChange={(event) => { setConfig((current) => ({ ...current, brand: { ...current.brand, background: event.target.value } })); setSaved(false); }} /></div></label>
              <label className="editor-field"><span>Texto de disponibilidade</span><input value="Disponível para projetos" readOnly /><small>Este texto fica fixo no cabeçalho para manter o sistema editorial.</small></label>
            </div>
          </div>
        </section>

        <section className="editor-panel" aria-labelledby="hero-title">
          <div className="editor-panel-heading"><span>02</span><div><p className="section-kicker">Hero</p><h2 id="hero-title">A mensagem de entrada.</h2></div></div>
          <div className="editor-fields editor-fields-hero">
            <label className="editor-field"><span>Etiqueta</span><input value={config.hero.eyebrow} onChange={(event) => { setConfig((current) => ({ ...current, hero: { ...current.hero, eyebrow: event.target.value } })); setSaved(false); }} /></label>
            <label className="editor-field"><span>Headline</span><textarea rows={3} value={config.hero.headline} onChange={(event) => { setConfig((current) => ({ ...current, hero: { ...current.hero, headline: event.target.value } })); setSaved(false); }} /></label>
            <label className="editor-field"><span>Resumo</span><textarea rows={4} value={config.hero.intro} onChange={(event) => { setConfig((current) => ({ ...current, hero: { ...current.hero, intro: event.target.value } })); setSaved(false); }} /></label>
          </div>
        </section>

        <section className="editor-panel" aria-labelledby="projects-title">
          <div className="editor-panel-heading"><span>03</span><div><p className="section-kicker">Projetos</p><h2 id="projects-title">A seleção que aparece.</h2></div></div>
          <div className="editor-projects">
            {config.projects.map((project, index) => (
              <article className={`editor-project ${project.visible ? "" : "editor-project-hidden"}`} key={`${project.number}-${project.title}`}>
                <div className="editor-project-thumb"><img src={project.image} alt="" /><span>{project.number}</span></div>
                <div className="editor-project-content">
                  <div className="editor-project-top"><strong>{project.title}</strong><label className="switch-field"><input type="checkbox" checked={project.visible} onChange={(event) => updateProject(index, { visible: event.target.checked })} /><span>Mostrar</span></label></div>
                  <div className="editor-project-grid">
                    <label className="editor-field"><span>Título</span><input value={project.title} onChange={(event) => updateProject(index, { title: event.target.value })} /></label>
                    <label className="editor-field"><span>Categoria</span><input value={project.type} onChange={(event) => updateProject(index, { type: event.target.value })} /></label>
                    <label className="editor-field"><span>Ano</span><input value={project.year} onChange={(event) => updateProject(index, { year: event.target.value })} /></label>
                    <label className="editor-field"><span>Tamanho</span><select value={project.size} onChange={(event) => updateProject(index, { size: event.target.value as ProjectConfig["size"] })}><option value="project-wide">Destaque largo</option><option value="project-card">Card padrão</option><option value="project-tall">Vertical</option></select></label>
                    <label className="editor-field"><span>Proporção</span><input value={project.aspectRatio} onChange={(event) => updateProject(index, { aspectRatio: event.target.value })} placeholder="1.26" /></label>
                    <label className="editor-field"><span>Posição do crop</span><input value={project.objectPosition} onChange={(event) => updateProject(index, { objectPosition: event.target.value })} placeholder="center" /></label>
                  </div>
                  <label className="editor-field"><span>URL da imagem</span><input value={project.image} onChange={(event) => updateProject(index, { image: event.target.value })} /></label>
                  <div className="editor-project-actions"><label className="upload-button upload-button-small"><ImagePlus size={14} /> Carregar imagem<input type="file" accept="image/*" onChange={(event) => uploadImage(event, (url) => updateProject(index, { image: url }))} /></label><label className="editor-field editor-link-field"><span>Link do projeto</span><input value={project.href} onChange={(event) => updateProject(index, { href: event.target.value })} /></label><div className="move-actions"><button type="button" aria-label="Mover projeto para cima" disabled={index === 0} onClick={() => moveProject(index, -1)}><MoveUp size={15} /></button><button type="button" aria-label="Mover projeto para baixo" disabled={index === config.projects.length - 1} onClick={() => moveProject(index, 1)}><MoveDown size={15} /></button></div></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="editor-bottom-callout"><Check size={19} /><div><strong>Quando terminar, salve e confira o resultado.</strong><p>O editor é uma camada de personalização rápida. Para uma mudança permanente na versão publicada, o próximo passo é salvar um checkpoint do projeto.</p></div><a href="/">Ver portfólio <ArrowLeft size={15} /></a></section>
      </main>
    </div>
  );
}
