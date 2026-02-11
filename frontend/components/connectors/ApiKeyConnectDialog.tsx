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
import type { ConnectorConfig, ApiKeyField } from "@/lib/connectors/registry";

interface ApiKeyConnectDialogProps {
  connector: ConnectorConfig | null;
  open: boolean;
  onClose: () => void;
  onConnect: (credentials: Record<string, string>) => Promise<boolean>;
}

const DEFAULT_FIELDS: ApiKeyField[] = [
  { name: "api_key", label: "API Key", placeholder: "Enter your API key", type: "password" },
];

export function ApiKeyConnectDialog({
  connector,
  open,
  onClose,
  onConnect,
}: ApiKeyConnectDialogProps) {
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "testing" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const fields = connector?.apiKeyFields ?? DEFAULT_FIELDS;

  function updateField(name: string, value: string) {
    setFieldValues((prev) => ({ ...prev, [name]: value }));
    setStatus("idle");
  }

  function allFieldsFilled(): boolean {
    return fields.every((f) => (fieldValues[f.name] ?? "").trim().length > 0);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allFieldsFilled()) return;

    setStatus("testing");
    setErrorMessage("");

    try {
      // Build trimmed credentials
      const credentials: Record<string, string> = {};
      for (const field of fields) {
        credentials[field.name] = (fieldValues[field.name] ?? "").trim();
      }

      const success = await onConnect(credentials);
      if (success) {
        setStatus("success");
        setTimeout(() => {
          onClose();
          setFieldValues({});
          setStatus("idle");
        }, 1500);
      } else {
        setStatus("error");
        setErrorMessage("Invalid credentials. Please check and try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Connection failed. Please try again.");
    }
  }

  if (!connector) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        onClose();
        setFieldValues({});
        setStatus("idle");
      }
    }}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Connect {connector.name}</DialogTitle>
          <DialogDescription>
            Enter your credentials to connect {connector.name}.
          </DialogDescription>
        </DialogHeader>

        {/* Instructions */}
        {connector.apiKeyInstructions && (
          <div className="rounded-lg bg-slate-50 p-3 text-sm text-text-secondary whitespace-pre-line">
            {connector.apiKeyInstructions}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                type={field.type ?? "password"}
                placeholder={field.placeholder}
                value={fieldValues[field.name] ?? ""}
                onChange={(e) => updateField(field.name, e.target.value)}
                disabled={status === "testing" || status === "success"}
              />
            </div>
          ))}

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
              disabled={!allFieldsFilled() || status === "testing" || status === "success"}
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
