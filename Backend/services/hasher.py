from argon2 import PasswordHasher
from argon2.exceptions import HashingError, VerifyMismatchError, VerificationError

p_hash = PasswordHasher()


def generate_hash(password: str):
    """Creates a hashed password by using the provided string

    :param password: password received during registration/ change-password process

    :return: hashed password

    :raise HashingError: Raise error on unsuccessful hashing
    """
    try:
        return p_hash.hash(password)
    except HashingError:
        raise HashingError.args[0]


def verify_password(old_hash: str, password: str) -> bool:
    """Verifies if user has provided a valid password

    :param old_hash: hash stored inside the database
    :param password: password received during login request

    :return: Depending on the validity return True/False

    :raise VerifyMismatchError: If verification fails because hash is not valid for password.
    :raise VerificationError: If verification fails for other reasons.
    """
    try:
        return p_hash.verify(old_hash, password)
    except (VerifyMismatchError, VerificationError):
        return False
