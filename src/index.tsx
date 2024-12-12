import h from 'vhtml';
import styleBase from './styles/base.scss';
import styleMac from './styles/mac.scss';
import styleWindows from './styles/windows.scss';
import MacClose from './assets/mac/close.svg';
import MacMinimize from './assets/mac/minimize.svg';
import MacStretch from './assets/mac/stretch.svg';
import WindowsClose from './assets/windows/close.svg';
import WindowsMinimize from './assets/windows/minimize.svg';
import WindowsStretch from './assets/windows/stretch.svg';

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
  const { name, type } = props;

  switch (type) {
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

type FrameType = 'mac' | 'windows';

interface FrameProps {
  name: string | null;
  type: FrameType;
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
  private styleTypeElement: HTMLStyleElement;
  private sectionElement: HTMLElement;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const styleBaseElement: HTMLStyleElement = document.createElement('style');
    const styleTypeElement: HTMLStyleElement = document.createElement('style');
    const sectionElement: HTMLElement = document.createElement('section');

    this.shadowRoot = shadowRoot;
    this.styleBaseElement = styleBaseElement;
    this.styleTypeElement = styleTypeElement;
    this.sectionElement = sectionElement;
  }

  private setStyle(type: FrameType): void {
    this.styleBaseElement.textContent = styleBase;
    this.styleTypeElement.textContent = styles[type];
  }

  private getType(): FrameType {
    const type: string = this.getAttribute('type') ?? 'mac';
    const types: string[] = ['mac', 'windows'];

    return (types.includes(type) ? type : 'mac') as FrameType;
  }

  public render(): void {
    const name: string | null = this.getAttribute('name');
    const type: FrameType = this.getType();

    this.setStyle(type);
    this.sectionElement.innerHTML = <Frame name={name} type={type} />;
  }

  public connectedCallback(): void {
    this.shadowRoot.appendChild(this.styleBaseElement);
    this.shadowRoot.appendChild(this.styleTypeElement);
    this.shadowRoot.appendChild(this.sectionElement);
    this.render();
  }

  public static get observedAttributes(): string[] {
    return ['name', 'type'];
  }

  public attributeChangedCallback(): void {
    this.render();
  }
}

customElements.define('e-frame', EFrame);
