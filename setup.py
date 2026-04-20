from setuptools import setup, find_packages

setup(
    name="marbrain-cli",
    version="1.0.0",
    description="MarBrain 360° Autonomous Research Platform CLI",
    author="SmartProDS",
    author_email="eslam@smartprods.com",
    url="https://github.com/yourusername/marbrain-cli",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "click>=8.0.0",
    ],
    entry_points={
        'console_scripts': [
            'marbrain=marbrain_cli.__main__:cli',
        ],
    },
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
    ],
    python_requires='>=3.10',
)