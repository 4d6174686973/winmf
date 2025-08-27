# WinMF 

This website is created with the [Nextra](https://nextra.site) template. See [Nextra Docs](https://nextra.site/docs) for development.

For multi language support [nextra v3](https://the-guild.dev/blog/nextra-3) is needed as stated in this [issue](https://github.com/shuding/nextra/issues/3139). 

This site is built on a clone of [swr website](https://github.com/shuding/nextra/tree/v3/examples/swr-site) which uses nextra v3.

## Development

Follow these steps

1. Run `npm install -g pnpm` in terminal
2. Run `pnpm update` to update the dependencies.
3. Run `pnpm i` to install the dependencies.
4. Run `pnpm dev` to start the development server and visit localhost:3000.

---
## Local Hosting

This site can be hosted locally using Docker, which allows you to run the website offline with all CSS, JS, and assets working correctly.

### Using Docker

1. Make sure [Docker Desktop](https://www.docker.com/products/docker-desktop/) is installed and running.
2. Build the Docker image:

```bash
docker build -t winmf-help .
```

3. Run the container

```bash
docker run --rm -p 3000:3000 --name winmf-help
```

4. Open your browser and visit: http://localhost:3000


### One-click startup (Windows)

Place the provided ``winmf-help.tar`` Docker image and ``start-winmf-help.bat`` in the same folder.

Double-click ``start-winmf-help.bat`` to start the site and automatically open the browser.

#### Notes

This method ensures the site is fully offline and self-contained.

No Node.js installation is required on the host machine when using the Docker image.