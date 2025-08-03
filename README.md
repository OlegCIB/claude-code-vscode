# Claude Code VS Code Extension

A VS Code extension that integrates with the Claude Code CLI, allowing you to send selected code to Claude and view the responses directly in VS Code.

## Features

- **Code Selection Integration**: Select any code in your editor and send it to Claude CLI
- **Context Menu Support**: Right-click on selected code to access the "Send to Claude CLI" command
- **Output Panel**: View Claude's responses in a dedicated output channel
- **Progress Indication**: Visual feedback while processing requests
- **Error Handling**: Clear error messages for troubleshooting

## Prerequisites

Before using this extension, you need to have the Claude Code CLI installed and accessible in your system PATH.

### Installing Claude Code CLI

```bash
# Install the Claude Code CLI (adjust based on actual installation method)
npm install -g claude-code-cli
# or
pip install claude-code-cli
# or follow the specific installation instructions for your system
```

Make sure the CLI is working by running:
```bash
claude-code --version
```

## Usage

1. **Select Code**: Highlight any code in your VS Code editor
2. **Send to Claude**: 
   - Right-click and select "Send to Claude CLI" from the context menu
   - Or use the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and search for "Claude Code: Send to Claude CLI"
3. **View Response**: The output will appear in the "Claude Code" output channel

## Development

### Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/OlegCIB/claude-code-vscode.git
   cd claude-code-vscode
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile the TypeScript code:
   ```bash
   npm run compile
   ```

### Running the Extension

1. Open the project in VS Code
2. Press `F5` to open a new Extension Development Host window
3. Test the extension in the new window

### Building

To compile the extension:
```bash
npm run compile
```

To watch for changes during development:
```bash
npm run watch
```

### Project Structure

```
├── src/
│   └── extension.ts          # Main extension logic
├── package.json              # Extension manifest and dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## Configuration

The extension currently uses the default `claude-code` command. If your Claude CLI has a different command name or requires specific arguments, you may need to modify the command in `src/extension.ts`.

## Troubleshooting

### "Command not found" Error

If you get an error that the `claude-code` command is not found:

1. Ensure the Claude Code CLI is installed
2. Verify it's in your system PATH
3. Try running `claude-code --version` in your terminal
4. Restart VS Code after installing the CLI

### Permission Issues

On some systems, you may need to ensure the Claude CLI has appropriate permissions to execute.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the extension thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
