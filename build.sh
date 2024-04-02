if command -v docker &> /dev/null; then
    # echo "Docker is installed and available."
    echo ""
else
    echo "\e[91mDocker is not installed or not available.\e[0m"
    exit 1
fi

docker build -t remix-antd-admin-d:v0.1.1 .
