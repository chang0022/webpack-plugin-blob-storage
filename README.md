# Webpack Plugin Blob Storage

> Package file uploader Plugin for Webpack [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs)

## Features

- Supports Account Key or SAS Token.
- Supports modifying the base URL.

## Install

```Bash
pnpm add @metalist/webpack-plugin-blob-storage -D
```

## Usage

```Javascript
import { BlobStorageWebpackPlugin } from "@metalist/webpack-plugin-blob-storage";

const useCDN = process.env.USE_CDN === 'true'

const config = {
  publicPath: useCDN ? process.env.BLOB_CDN_PATH + '/' : '/',
  plugins: [
    new BlobStorageWebpackPlugin(useCDN, {
        accountName: process.env.BLOB_ACCOUNT_NAME!,
        sasToken: process.env.BLOB_SAS_TOKEN,
        containerName: process.env.BLOB_CONTAINER_NAME!,
        subPath: process.env.BLOB_SUB_PATH,
        excludes: ['*.html'],
      }
    ),
  ]
}

```

**Options**

|           Name           |       Type        |        Default         | Required | Description                                    |
| :----------------------: | :---------------: | :--------------------: | :------: | :--------------------------------------------- |
|  **[`accountName`](#)**  |    `{String}`     |                        |   true   | The name of the Azure Storage account.         |
|  **[`accountKey`](#)**   |    `{String}`     |                        |  false   | The account key for the Azure Storage account. |
|   **[`sasToken`](#)**    |    `{String}`     |                        |  false   | The SAS token for the Azure Storage account.   |
| **[`containerName`](#)** |    `{String}`     |                        |   true   | The name of the container.                     |
|    **[`subPath`](#)**    |    `{String}`     |                        |  false   | The subPath of the container.                  |
|   **[`excludes`](#)**    | `{Array[string]}` | ['.DS_Store', '*.map'] |  false   | excluded content 型                            |

- `containerName`

  - The length of a container name can be from 3 to 63 characters.
  - The container name must start with a letter or number and can only contain lowercase letters, numbers, and hyphens (-).
  - Consecutive hyphens are not allowed in the container name.

- `excludes` Matching related files or folders. For detailed usage, please refer to: [micromatch](https://github.com/micromatch/micromatch)

  - `*.map` do not upload files with the `map` file extension.

- `accountKey` and `sasToken`

  - The priority of `accountKey` is higher than `sasToken`.
  - `accountKey` and sasToken cannot be empty at the same time

- `subPath`

  - The subPath suggestion use the project name.
  - The subPath can be used to distinguish different projects in the same container.
  - The subPath container name must start with a letter or number and can only contain lowercase letters, numbers, and hyphens (-).
  - The length of a container name can be from 3 to 63 characters.

## License

Released under the [MIT License](LICENSE).
