import RESTTamplate from "@/Helpers/Api/TemplatesDP/RESTTamplate";
import IoCContainer from "@/Helpers/IoCContainer";

export default function bootstrapApp () {
  IoCContainer.getInstance().resolve<RESTTamplate>("RESTTamplate");
  IoCContainer.getInstance().resolve<RESTTamplate>("RESTService");
}