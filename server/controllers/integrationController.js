const Integration = require("../models/integrationModel.js");

const connectSlack = async (req, res) => {
  try {
    const { projectId, slackWebhookUrl } = req.body;
    const integration = new Integration({
      project: projectId,
      type: "Slack",
      settings: { webhookUrl: slackWebhookUrl },
    });
    await integration.save();

    res.json({ message: "Slack integration added", integration });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { connectSlack };
