import IoCContainer from "@/Helpers/IoCContainer";

export default function inject(varName: string) {
  return function (target: any, propertyKey: string) {
    target[propertyKey] = IoCContainer.getInstance().resolve(varName);
  };
}