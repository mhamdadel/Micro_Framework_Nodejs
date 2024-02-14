export default class IoCContainer {
  private static instance: IoCContainer | null = null;
  private dependencies: { [key: string]: any } = {};

  private constructor() {}

  static getInstance(): IoCContainer {
    if (!IoCContainer.instance) {
      IoCContainer.instance = new IoCContainer();
    }
    return IoCContainer.instance;
  }

  register<T>(key: string, value: T)  {
    this.dependencies[key] = value;
  }

  resolve<T>(key: string): T {
    if (this.dependencies.hasOwnProperty(key)) {
      return this.dependencies[key];
    }
    throw new Error(`Dependency ${key} not registered.`);
  }
}
