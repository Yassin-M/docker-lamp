<?php
// Centralized security headers for PHP responses.
// Include this file as early as possible (before any output).

// Content Security Policy: only allow same-origin resources by default.
// Adjust the policy if your app needs external CDNs or inline scripts/styles.
// Note: CSP is managed via Apache /.htaccess to cover static files.
// Keep PHP-only headers here to avoid duplicate CSP headers.

// Security headers are primarily managed in Apache (app/.htaccess)
// to ensure both static and dynamic responses receive them.
// Keep this include file available if PHP-specific headers are needed later.

// Optional: reduce information disclosure via server header (may require server config)
// header('Server: ');

?>
