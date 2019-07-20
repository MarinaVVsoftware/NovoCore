/* Schemas de validación de los endpoints de Notifications */
const Notifications = {};

Notifications.ParamsGetNotificationByQuotation = {
  type: "object",
  required: ["quotation"],
  properties: {
    quotation: {
      type: "string"
    }
  }
};

Notifications.ParamsPostNotification = {
  type: "object",
  required: ["quotation"],
  properties: {
    quotation: {
      type: "string"
    }
  }
};

Notifications.BodyPostNotification = {
  type: "object",
  required: ["notification"],
  properties: {
    notification: {
      type: "object",
      required: [
        "clientId",
        "notificationTypeId",
        "notificationStatusId",
        "title",
        "message",
        "creationResponsable",
        "dateToSend"
      ],
      properties: {
        clientId: {
          type: "number"
        },
        notificationTypeId: {
          type: "number"
        },
        notificationStatusId: {
          type: "number"
        },
        title: {
          type: "string"
        },
        message: {
          type: "string"
        },
        creationResponsable: {
          type: "string"
        },
        dateToSend: {
          type: "string"
        }
      }
    }
  }
};

Notifications.ParamsPatchNotification = {
  type: "object",
  required: ["quotation", "notification"],
  properties: {
    quotation: {
      type: "string"
    },
    notification: {
      type: "string"
    }
  }
};

Notifications.BodyPatchNotification = {
  type: "object",
  required: ["notification"],
  properties: {
    notification: {
      type: "object",
      required: ["title", "message", "dateToSend"],
      properties: {
        title: {
          type: "string"
        },
        message: {
          type: "string"
        },
        dateToSend: {
          type: "string"
        }
      }
    }
  }
};

Notifications.ParamsDeleteNotification = {
  type: "object",
  required: ["quotation", "notification"],
  properties: {
    quotation: {
      type: "string"
    },
    notification: {
      type: "string"
    }
  }
};

module.exports = Notifications;
