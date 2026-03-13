import { useEffect, useCallback, useRef } from 'react';

// Message type definitions
export interface GuideData {
  axis: 'X' | 'Y'
  offset: number
}

export interface MarginData {
  marginSize: string | number
}

export interface PluginMessage {
  type: 'add-guide' | 'add-margins' | 'clearAllGuides' | 'frameWidth' | 'frameHeight' | 'close'
  data?: GuideData | MarginData | any
}

export interface PluginResponse {
  status?: 'selected' | 'none'
  width?: number
  height?: number
  query?: string
}

interface UsePluginMessageOptions {
  onSelectionChange?: (status: 'selected' | 'none') => void
  onDimensionReceived?: (dimension: 'width' | 'height', value: number) => void
}

export function usePluginMessage (options: UsePluginMessageOptions = {}) {
  const { onSelectionChange, onDimensionReceived } = options;
  const pendingResponseRef = useRef<string | null>(null);

  // Handle incoming messages from plugin
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data.pluginMessage as PluginResponse;

      if (!message) return;

      // Handle selection change notification
      if (message.status === 'selected' || message.status === 'none') {
        onSelectionChange?.(message.status);
      }

      // Handle dimension queries (width/height)
      if (message.width !== undefined && pendingResponseRef.current === 'width') {
        onDimensionReceived?.('width', message.width);
        pendingResponseRef.current = null;
      }

      if (message.height !== undefined && pendingResponseRef.current === 'height') {
        onDimensionReceived?.('height', message.height);
        pendingResponseRef.current = null;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onSelectionChange, onDimensionReceived]);

  // Send message to plugin
  const sendMessage = useCallback((message: PluginMessage) => {
    if (message.type === 'frameWidth' || message.type === 'frameHeight') {
      pendingResponseRef.current = message.type === 'frameWidth' ? 'width' : 'height';
    }

    parent.postMessage({ pluginMessage: message }, "*");
  }, []);

  // Helper functions for common operations
  const addGuide = useCallback((axis: 'X' | 'Y', offset: number) => {
    sendMessage({
      type: 'add-guide',
      data: { axis, offset }
    });
  }, [sendMessage]);

  const addMargins = useCallback((marginSize: number) => {
    sendMessage({
      type: 'add-margins',
      data: { marginSize }
    });
  }, [sendMessage]);

  const clearAllGuides = useCallback(() => {
    sendMessage({ type: 'clearAllGuides' });
  }, [sendMessage]);

  const getFrameWidth = useCallback(() => {
    sendMessage({ type: 'frameWidth' });
  }, [sendMessage]);

  const getFrameHeight = useCallback(() => {
    sendMessage({ type: 'frameHeight' });
  }, [sendMessage]);

  const closePlugin = useCallback(() => {
    sendMessage({ type: 'close' });
  }, [sendMessage]);

  return {
    sendMessage,
    addGuide,
    addMargins,
    clearAllGuides,
    getFrameWidth,
    getFrameHeight,
    closePlugin,
    pendingResponseRef
  };
}
