class ProviderError(RuntimeError):
    """Safe, user-facing failure; never include API response bodies or secrets."""
