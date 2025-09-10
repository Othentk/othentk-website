#!/bin/bash

# Set Node.js options for OpenSSL compatibility (only for Node.js 17+)
export NODE_OPTIONS="--openssl-legacy-provider"

# Ensure build directory exists
mkdir -p build

# Copy public files to build directory first
cp -r public/* build/ || true

# Run the regular build script with legacy OpenSSL provider
NODE_OPTIONS="--openssl-legacy-provider" SKIP_PREFLIGHT_CHECK=true DISABLE_ESLINT_PLUGIN=true TSC_COMPILE_ON_ERROR=true react-scripts build