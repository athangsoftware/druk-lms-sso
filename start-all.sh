#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get script directory (absolute path)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CORE_DIR="$SCRIPT_DIR/core"
UI_DIR="$SCRIPT_DIR/ui"

# Function to kill process on a specific port
kill_port() {
    local port=$1
    local pids=$(lsof -ti :$port 2>/dev/null)
    if [ -n "$pids" ]; then
        for pid in $pids; do
            echo -e "  ${YELLOW}Killing existing process on port $port (PID: $pid)${NC}"
            kill -9 $pid 2>/dev/null
        done
        sleep 2
    fi
}

# Function to wait until port is free
wait_for_port() {
    local port=$1
    local max_attempts=10
    local attempt=0
    while [ $attempt -lt $max_attempts ]; do
        if ! lsof -ti :$port >/dev/null 2>&1; then
            return 0
        fi
        echo -e "  ${YELLOW}Waiting for port $port to be free...${NC}"
        sleep 1
        ((attempt++))
    done
    echo -e "  ${RED}Failed to free port $port${NC}"
    return 1
}

echo -e "${GREEN}Starting all SSO applications...${NC}"
echo ""

# Kill existing processes on all ports
echo -e "${YELLOW}Checking for existing processes...${NC}"
kill_port 3000
kill_port 3001
kill_port 7001
kill_port 7002

# Wait for ports to be free
wait_for_port 3000
wait_for_port 3001
wait_for_port 7001
wait_for_port 7002
echo ""

# Store PIDs for cleanup
PIDS=()

# Cleanup function
cleanup() {
    echo ""
    echo -e "${YELLOW}Stopping all applications...${NC}"
    
    # Kill all child processes
    for pid in "${PIDS[@]}"; do
        # Kill the process group to ensure all children are killed
        pkill -P $pid 2>/dev/null
        kill $pid 2>/dev/null
    done
    
    # Also kill any remaining processes on our ports
    kill_port 3000
    kill_port 3001
    kill_port 7001
    kill_port 7002
    
    exit 0
}

# Trap SIGINT (Ctrl+C) and SIGTERM
trap cleanup SIGINT SIGTERM

# Start Core (NestJS) apps
echo -e "${BLUE}Starting Core API services...${NC}"

echo -e "  ${GREEN}→${NC} SSO API (port 3000)"
(cd "$CORE_DIR" && npm run start:sso) &
PIDS+=($!)
sleep 3

echo -e "  ${GREEN}→${NC} Report API (port 3001)"
(cd "$CORE_DIR" && PORT=3001 npm run start:report) &
PIDS+=($!)
sleep 3

# Start UI (Angular) apps
echo -e "${BLUE}Starting UI applications...${NC}"

echo -e "  ${GREEN}→${NC} SSO UI (port 7001)"
(cd "$UI_DIR" && npm run start:sso) &
PIDS+=($!)

echo -e "  ${GREEN}→${NC} Report UI (port 7002)"
(cd "$UI_DIR" && npm run start:report) &
PIDS+=($!)

echo ""
echo -e "${GREEN}All applications started!${NC}"
echo ""
echo -e "${YELLOW}Running services:${NC}"
echo -e "  SSO API:    ${BLUE}http://localhost:3000${NC}"
echo -e "  SSO UI:     ${BLUE}http://localhost:7001${NC}"
echo -e "  Report API: ${BLUE}http://localhost:3001${NC}"
echo -e "  Report UI:  ${BLUE}http://localhost:7002${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"

# Wait for all background processes
wait
