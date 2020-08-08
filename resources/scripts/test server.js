const config = {
  MAX_PODS: 90
};

const move = [
  { map: currentMapId(), custom: server }
];

async function* server() {
  printMessage("Nous sommes connecté au serveur " + character.serverId());
  printMessage("Nous sommes connecté au serveur " + character.serverName());
  printMessage(`Nous sommes connecté au serveur ${character.serverName()} (ID : ${character.serverId()})`);
  stopScript();
}
