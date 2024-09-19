const express = require('express');
const multer = require('multer');
const { Octokit } = require('@octokit/rest');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

// 使用您的个人访问令牌创建 Octokit 实例
const octokit = new Octokit({ auth: 'YOUR_PERSONAL_ACCESS_TOKEN' });

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const content = fs.readFileSync(req.file.path, { encoding: 'base64' });

        await octokit.repos.createOrUpdateFileContents({
            owner: 'Cybersurfer-1',
            repo: 'Cybersurfer.github.io',
            path: `projects/${req.file.originalname}`,
            message: `Upload ${req.file.originalname}`,
            content: content,
            branch: 'main'
        });

        res.status(200).send('File uploaded successfully.');
    } catch (error) {
        console.error('Error uploading file to GitHub:', error);
        res.status(500).send('Error uploading file to GitHub.');
    } finally {
        // 清理临时文件
        fs.unlinkSync(req.file.path);
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));