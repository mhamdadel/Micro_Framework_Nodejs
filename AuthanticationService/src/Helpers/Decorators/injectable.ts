import IoCContainer from '@/Helpers/IoCContainer';

export default function injectable(key: string) {
  return function <T extends new (...args: any[]) => {}>(constructor: T) {
    IoCContainer.getInstance().register<T>(key, constructor);
    return class extends constructor {};
  };
}
