import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosHeaders,
} from "axios";



// Create an Axios instance with base configuration
const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:3004", // Set your base URL here
    timeout: 5000, // Set a timeout for requests (in milliseconds)
    headers: {
        "Content-Type": "application/json", // Default content type
    },
});

// Function to get the security token
const getSecurityToken = (): string | null => {
    // Example: get token from localStorage
    return localStorage.getItem("securityToken");
};

// Attach security tokens to requests using a request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getSecurityToken(); // Get the security token
        const updatedConfig = { ...config }; // Clone config to avoid mutation
        if (token) {
            if (!updatedConfig.headers) {
                updatedConfig.headers = {} as AxiosHeaders; // Ensure headers are defined
            }
            updatedConfig.headers.Authorization = `Bearer ${token}`; // Add token to headers
        }
        return updatedConfig;
    },
    (error: AxiosError) => {
        return Promise.reject(error); // Handle request errors
    }
);

// Function to process and standardize response data
const processResponseData = (response: AxiosResponse): any => {
    if (response.data && typeof response.data === "object") {
        return {
            status: "success",
            data: response.data,
            message: response.data.message || "", // Include a message if available
        };
    }
    return {
        status: "error",
        data: null,
        message: "Invalid data format",
    };
};

// Response interceptor to streamline data handling and error management
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => processResponseData(response), // Process and standardize the response data
    (error: AxiosError) => {
        let errorMessage = 'An error occurred' // Default error message

        if (error.response) {
            const statusCode = error.response.status // HTTP status code
            const errorData = error.response.data // Error data from the server

            switch (statusCode) {
                case 400:
                    errorMessage = 'Bad request'
                    break
                case 401:
                    errorMessage = 'Unauthorized access. Please check your credentials.'
                    break
                case 403:
                    errorMessage = 'Forbidden. You do not have permission to access this resource.'
                    break
                case 404:
                    errorMessage = 'Resource not found. Please check the endpoint.'
                    break
                case 500:
                    errorMessage = 'Internal server error. Please try again later.'
                    break
                default:
                    errorMessage = `HTTP error: ${statusCode}`
                    break
            }
        } else if (error.request) {
            errorMessage = 'No response from the server. Please check your network connection.'
        } else {
            errorMessage = `Request error: ${error.message}`
        }

        // Return a consistent error structure
        return Promise.reject({
            status: 'error',
            message: errorMessage,
            originalError: error, // Include the original error for further debugging
        })
    }
);

// Function to manage file uploads
const uploadFile = async (
    endpoint: string,
    file: File,
    additionalData?: Record<string, any>
): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append("file", file); // Append the file to the form data

    if (additionalData) {
        Object.entries(additionalData).forEach(([key, value]) => {
            formData.append(key, value); // Append additional data
        });
    }

    const config: AxiosRequestConfig = {
        headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
        },
    };

    return axiosInstance.post(endpoint, formData, config); // Post with file data
};

// Function to manage file downloads
const downloadFile = async (
    endpoint: string,
    fileName: string
): Promise<void> => {
    const response = await axiosInstance.get(endpoint, {
        responseType: "blob", // Return as a binary object
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); // Set the download filename
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link); // Cleanup
};

export { axiosInstance, uploadFile, downloadFile };
