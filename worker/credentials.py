"""Credential encryption/decryption helpers."""

import os
import base64
from cryptography.fernet import Fernet


def get_cipher() -> Fernet:
    key = os.getenv("CONNECTOR_ENCRYPTION_KEY", "")
    # Ensure key is 32 bytes, base64-encoded for Fernet
    key_bytes = key.encode("utf-8")[:32].ljust(32, b"\0")
    fernet_key = base64.urlsafe_b64encode(key_bytes)
    return Fernet(fernet_key)


def encrypt_credentials(data: str) -> str:
    cipher = get_cipher()
    return cipher.encrypt(data.encode("utf-8")).decode("utf-8")


def decrypt_credentials(encrypted: str) -> str:
    cipher = get_cipher()
    return cipher.decrypt(encrypted.encode("utf-8")).decode("utf-8")
