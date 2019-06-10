var fetch = require("isomorphic-fetch");
var Dropbox = require("dropbox").Dropbox;

class DropboxClass {
  /* Inicializa una instancia de dropbox. Desafortunadamente
  esta instancia es "estática" y solo presenta errores al ejecutar
  una función. Si se provee mal la key, solo se puede saber hasta
  ejecutar un endpoint. */
  constructor(config) {
    this.dropbox = new Dropbox({
      accessToken: config.key,
      fetch: fetch
    });
  }

  /** Obtiene los datos de la cuenta de dropbox
   */
  async GetCurrentAccount() {
    return await this.dropbox.usersGetCurrentAccount();
  }

  /** Sube un archivo dentro de la nube de dropbox.
   *
   * @param {string} path url donde se alojará el documento,
   * incluyendo su nombre y extensión
   * @param {object} buffer objeto con la información del archivo
   */
  async UploadFile(path, buffer) {
    return await this.dropbox.filesUpload({
      path: path,
      contents: buffer
    });
  }

  /** Elimina un archivo en la nube de dropbox dado un path.
   *
   * @param {string} path url del archivo en el root de dropbox
   */
  async DeleteFile(path) {
    return await this.dropbox.filesDelete({
      path: path
    });
  }

  /** Genera y retorna un enlace compartido que posibilita la descarga
   * del archivo en dropbox.
   *
   * @param {string} path url del archivo en el root de dropbox
   */
  async GetLink(path) {
    return await this.dropbox.sharingCreateSharedLinkWithSettings({
      path: path
    });
  }
}

module.exports = DropboxClass;
