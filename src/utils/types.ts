export type channelMessage = {
  id: string;
  channelName: string;
  channelId: string;
  personName: string;
  personId: string;
  msg: {
    pureContent: string;
    createdAt: string;
    formatMessage: string;
    attachments: string[];
  };
};
