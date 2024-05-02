const appConfig = {
  db: () => import("../Configs/Database").then(module => module.default.connections),
  msQ: () => import("../Configs/MessageQueue").then(module => module.default.connections)
};

export default appConfig;
