import { Home, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="recovery-page">
          <main className="recovery-main" aria-labelledby="recovery-title">
            <p className="section-kicker">Recuperação de página</p>
            <span className="recovery-code">00</span>
            <h1 id="recovery-title">Algo saiu<br /><em>do caminho.</em></h1>
            <p>O site encontrou um imprevisto. Você pode recarregar esta página ou voltar com segurança para o início do portfólio.</p>
            <div className="recovery-actions">
              <a className="not-found-home-link" href="/"><Home size={17} /> Página inicial</a>
              <button type="button" onClick={() => window.location.reload()}><RotateCcw size={16} /> Tentar novamente</button>
            </div>
          </main>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
