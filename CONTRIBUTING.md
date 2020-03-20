## Building The Library

The library should build and pass all tests.

```shell
# Clone repository
$ git clone https://Harpangell@bitbucket.org/angellenterprises/ae-admin.git
$ cd ae-admin

# Pull submodules
$ git submodule update --init --recursive
```


# Cute Animal Pictures

All pull requests need to have a cute animal picture.  This is a very important
part of the development process.


# Pull Requests

In general, pull requests are welcome.  Please try to adhere to the following.

- code should conform to PEP8 and as well as the linting done by `flake8 web3/ tests/`
- include tests.
- include any relevant documentation updates.

It's a good idea to make pull requests early on.  A pull request represents the
start of a discussion, and doesn't necessarily need to be the final, finished
submission.

GitHub's documentation for working on pull requests is [available here](https://help.github.com/articles/about-pull-requests/).

Always run the tests before submitting pull requests, and ideally run `tox` in
order to check that your modifications don't break anything.

Once you've made a pull request take a look at the travis build status in the
GitHub interface and make sure the tests are runnning as you'd expect.
