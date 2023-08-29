const OpenAI = require('openai');

const openai = new OpenAI({
  key: process.env.OPENAI_API_KEY,
});


const generateImage = async (req, res) => {
  /*const { prompt, size } = req.body;

  const imageSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';
*/
  try {
    const response = await openai.images.generate({
      prompt: "Anaconda and monkey coding",
      n: 1,
      size: '256x256',
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
  }
};

module.exports = { generateImage };