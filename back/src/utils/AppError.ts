class AppError extends Error {
    constructor(public status: number, public message: string) {
        super(message);
        this.name = "AppError";
        this.status = status;
    }
}

export default AppError;
