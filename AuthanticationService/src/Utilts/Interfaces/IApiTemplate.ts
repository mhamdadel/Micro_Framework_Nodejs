export default interface Template {
  prepareRequest(): void;
  send(): Promise<any>;
}