import styleBase from '@/styles/base.scss';
import styleMac from '@/styles/mac.scss';
import styleWindows from '@/styles/windows.scss';
import MacClose from '@/assets/icons/mac/close.svg';
import MacMinimize from '@/assets/icons/mac/minimize.svg';
import MacStretch from '@/assets/icons/mac/stretch.svg';
import WindowsClose from '@/assets/icons/windows/close.svg';
import WindowsMinimize from '@/assets/icons/windows/minimize.svg';
import WindowsStretch from '@/assets/icons/windows/stretch.svg';

const styles = {
  mac: styleMac,
  windows: styleWindows,
};

interface Props {
  children: string[];
}

function Fragment(props: Props): string {
  return props.children.join('');
}

function MacControls(): string {
  return (
    <div class="controls">
      <i class="circle close" dangerouslySetInnerHTML={{ __html: MacClose }} />
      <i class="circle minimize" dangerouslySetInnerHTML={{ __html: MacMinimize }} />
      <i class="circle stretch" dangerouslySetInnerHTML={{ __html: MacStretch }} />
    </div>
  );
}

function WindowsControls(): string {
  return (
    <div class="controls">
      <i class="minimize" dangerouslySetInnerHTML={{ __html: WindowsMinimize }} />
      <i class="stretch" dangerouslySetInnerHTML={{ __html: WindowsStretch }} />
      <i class="close" dangerouslySetInnerHTML={{ __html: WindowsClose }} />
    </div>
  );
}

function TitleBar(props: FrameProps): string {
  const { name, theme } = props;

  switch (theme) {
    case 'mac':
      return (
        <header class="mac">
          <MacControls />
          <span class="title">{name}</span>
        </header>
      );
    case 'windows':
      return (
        <header class="windows">
          <span class="title">{name}</span>
          <WindowsControls />
        </header>
      );
  }
}

function ContentArea(): string {
  return (
    <main>
      <slot></slot>
    </main>
  );
}

type FrameTheme = 'mac' | 'windows';

interface FrameProps {
  name: string | null;
  theme: FrameTheme;
}

function Frame(props: FrameProps): string {
  return (
    <>
      <TitleBar {...props} />
      <ContentArea />
    </>
  );
}

class EFrame extends HTMLElement {
  public shadowRoot: ShadowRoot;
  private styleBaseElement: HTMLStyleElement;
  private styleThemeElement: HTMLStyleElement;
  private sectionElement: HTMLElement;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const styleBaseElement: HTMLStyleElement = document.createElement('style');
    const styleThemeElement: HTMLStyleElement = document.createElement('style');
    const sectionElement: HTMLElement = document.createElement('section');

    this.shadowRoot = shadowRoot;
    this.styleBaseElement = styleBaseElement;
    this.styleThemeElement = styleThemeElement;
    this.sectionElement = sectionElement;
  }

  private setStyle(theme: FrameTheme): void {
    this.styleBaseElement.textContent = styleBase;
    this.styleThemeElement.textContent = styles[theme];
  }

  private getTheme(): FrameTheme {
    const theme: string = this.getAttribute('theme') ?? 'mac';
    const themes: string[] = ['mac', 'windows'];

    return themes.includes(theme) ? (theme as FrameTheme) : 'mac';
  }

  private handleClose(): void {
    this.remove();
  }

  public render(): void {
    const name: string | null = this.getAttribute('name');
    const theme: FrameTheme = this.getTheme();

    this.setStyle(theme);
    this.sectionElement.innerHTML = <Frame name={name} theme={theme} />;
  }

  public connectedCallback(): void {
    this.shadowRoot.appendChild(this.styleBaseElement);
    this.shadowRoot.appendChild(this.styleThemeElement);
    this.shadowRoot.appendChild(this.sectionElement);
    this.render();
    this.shadowRoot
      .querySelector('header .close')
      ?.addEventListener('click', () => this.handleClose());
  }

  public static get observedAttributes(): string[] {
    return ['name', 'theme'];
  }

  public attributeChangedCallback(): void {
    this.render();
  }
}

customElements.define('e-frame', EFrame);
