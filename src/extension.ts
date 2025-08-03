import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as util from 'util';

const execAsync = util.promisify(exec);

let outputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext) {
    console.log('Claude Code extension is now active!');

    // Create output channel
    outputChannel = vscode.window.createOutputChannel('Claude Code');
    context.subscriptions.push(outputChannel);

    // Register the command
    let disposable = vscode.commands.registerCommand('claude-code.sendToClaudeCLI', async () => {
        await sendSelectedCodeToClaudeCLI();
    });

    context.subscriptions.push(disposable);
}

async function sendSelectedCodeToClaudeCLI() {
    const editor = vscode.window.activeTextEditor;
    
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
    }

    const selection = editor.selection;
    if (selection.isEmpty) {
        vscode.window.showErrorMessage('No code selected');
        return;
    }

    const selectedText = editor.document.getText(selection);
    
    try {
        // Show progress
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Sending code to Claude CLI...",
            cancellable: false
        }, async (progress) => {
            progress.report({ increment: 0 });

            // Clear previous output
            outputChannel.clear();
            outputChannel.show(true);

            // Execute Claude CLI command
            // Note: This assumes 'claude-code' CLI is available in PATH
            // Users may need to adjust this command based on their CLI setup
            
            progress.report({ increment: 50 });

            try {
                // Use echo to pipe the selected text to claude-code command
                const command = `echo ${JSON.stringify(selectedText)} | claude-code`;
                const { stdout, stderr } = await execAsync(command, {
                    timeout: 30000 // 30 second timeout
                });

                progress.report({ increment: 100 });

                // Display the output
                outputChannel.appendLine('=== Claude CLI Response ===');
                outputChannel.appendLine('');
                outputChannel.appendLine('Selected Code:');
                outputChannel.appendLine('```');
                outputChannel.appendLine(selectedText);
                outputChannel.appendLine('```');
                outputChannel.appendLine('');
                outputChannel.appendLine('Claude Response:');
                outputChannel.appendLine(stdout);

                if (stderr) {
                    outputChannel.appendLine('');
                    outputChannel.appendLine('Errors/Warnings:');
                    outputChannel.appendLine(stderr);
                }

                vscode.window.showInformationMessage('Code sent to Claude CLI successfully!');

            } catch (error: any) {
                outputChannel.appendLine('=== Error ===');
                outputChannel.appendLine(`Failed to execute Claude CLI: ${error.message}`);
                
                if (error.code === 'ENOENT') {
                    outputChannel.appendLine('');
                    outputChannel.appendLine('Make sure Claude CLI is installed and available in your PATH.');
                    outputChannel.appendLine('You may need to install it first or adjust the command in the extension settings.');
                }

                vscode.window.showErrorMessage(`Failed to send code to Claude CLI: ${error.message}`);
            }
        });

    } catch (error: any) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    }
}

export function deactivate() {
    if (outputChannel) {
        outputChannel.dispose();
    }
}