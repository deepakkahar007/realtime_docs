import * as Y from "yjs";

/**
 * BroadcastChannel-based Yjs provider for cross-tab collaboration
 * This allows real-time collaboration between browser tabs without a backend
 * 
 * TODO: Replace this with WebSocket/WebRTC provider when backend is ready
 */
export class BroadcastChannelProvider {
  private channel: BroadcastChannel;
  private doc: Y.Doc;

  constructor(doc: Y.Doc, documentId: string) {
    this.doc = doc;
    
    // Create a broadcast channel for this document
    this.channel = new BroadcastChannel(`yjs-${documentId}`);
    
    // Listen for updates from other tabs
    this.channel.onmessage = (event) => {
      const { update } = event.data;
      
      if (update) {
        // Apply the update from another tab
        Y.applyUpdate(this.doc, new Uint8Array(update));
      }
    };

    // Listen for local document changes and broadcast to other tabs
    this.doc.on('update', (update: Uint8Array) => {
      this.channel.postMessage({
        update: Array.from(update),
      });
    });
  }

  /**
   * Clean up the provider
   */
  destroy() {
    this.channel.close();
  }
}
