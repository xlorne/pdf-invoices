import tomllib
with open('pyproject.toml', 'rb') as f:
    data = tomllib.load(f)
deps = data['project']['dependencies']
with open('requirements.txt', 'w') as f:
    f.write('\n'.join(deps))