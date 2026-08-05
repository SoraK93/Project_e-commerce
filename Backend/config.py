from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Contains all the environment variables with proper type support"""
    # server setting
    SERVER_HOST: str
    SERVER_PORT: int
    # Database info
    HOST: str
    DB_USER: str
    DB_NAME: str
    DB_PASSWORD: str
    DB_PORT: int
    # Database URL
    DB_URL: str
    # generated using command (openssl rand -hex 32) in terminal
    S_SECRET: str
    # Frontend URL
    CLIENT_URL: str
    RENDER_URL: str

    model_config = SettingsConfigDict(env_file=".env",
                                      extra="ignore")


setting = Settings()
