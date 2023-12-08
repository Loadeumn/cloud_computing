# Installation Guide

## Make sure you have Docker Desctop installed, otherwise you can follow this link:

    https://docs.docker.com/desktop/install/mac-install/

## Since the NGINX controller is used for the Ingress proxy service, make sure you have that installed aswell, if you have not, follow the steps below (or visit the link: https://docs.k0sproject.io/v1.28.2+k0s.0/examples/nginx-ingress/):

1. Install NGINX Ingress Controller (using the official manifests by the ingress-nginx project):

    ```$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.3/deploy/static/provider/baremetal/deploy.yaml```

2. Check that the Ingress controller pods have started:

    ```$ kubectl get pods -n ingress-nginx```

3. Check that you can see the service

    ```$ kubectl get services -n ingress-nginx```



## Run the following command to install the Kubernetes Cluster:

    ```$ bash kuberneted_deploy.sh```

