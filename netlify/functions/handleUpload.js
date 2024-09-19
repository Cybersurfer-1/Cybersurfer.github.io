const { Octokit } = require('@octokit/rest');
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const { name, url } = JSON.parse(event.body).payload.file;

  try {
    const fileResponse = await fetch(url);
    const fileContent = await fileResponse.buffer();
    const base64Content = fileContent.toString('base64');

    await octokit.repos.createOrUpdateFileContents({
      owner: 'Cybersurfer-1',
      repo: 'Cybersurfer.github.io',
      path: `projects/${name}`,
      message: `Upload ${name}`,
      content: base64Content,
      branch: 'main'
    });

    // 触发新的部署
    await fetch(process.env.BUILD_HOOK_URL, { method: 'POST' });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File uploaded and site redeployed' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to upload file' }),
    };
  }
};