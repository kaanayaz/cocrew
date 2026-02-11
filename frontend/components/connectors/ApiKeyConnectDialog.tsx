"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import type { ConnectorConfig } from "@/lib/connectors/registry";

interface ApiKeyConnectDialogProps {
  connector: ConnectorConfig | null;
  open: boolean;
  onClose: () => void;
  onConnect: (apiKey: string) => Promise<boolean>;
}

export function ApiKeyConnectDialog({
  connector,
  open,
  onClose,
  onConnect,
}: ApiKeyConnectDialogProps) {
  const [apiKey, setApiKey] = useState("");
  const [status, setStatus] = useState<
    "idle" | "testing" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setStatus("testing");
    setErrorMessage("");

    try {
      const success = await onConnect(apiKey.trim());
      if (success) {
        setStatus("success");
        setTimeout(() => {
          onClose();
          setApiKey("");
          setStatus("idle");
        }, 1500);
      } else {
        setStatus("error");
        setErrorMessage("Invalid API key. Please check and try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Connection failed. Please try again.");
    }
  }

  if (!connector) return null;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Connect {connector.name}</DialogTitle>
          <DialogDescription>
            Enter your API key to connect {connector.name}.
          </DialogDescription>
        </DialogHeader>

        {/* Instructions */}
        {connector.apiKeyInstructions && (
          <div className="rounded-lg bg-slate-50 p-3 text-sm text-text-secondary">
            {connector.apiKeyInstructions}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setStatus("idle");
              }}
              disabled={status === "testing" || status === "success"}
            />
          </div>

          {/* Status messages */}
          {status === "success" && (
            <div className="flex items-center gap-2 text-sm text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              Connected successfully!
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {errorMessage}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={status === "testing"}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!apiKey.trim() || status === "testing" || status === "success"}
            >
              {status === "testing" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                "Connect"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
