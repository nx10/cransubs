# CRAN submission tracker

Website: https://nx10.github.io/cransubs

Server repo: https://github.com/nx10/cransubs-server

## About
* This tracker is inofficial and in no way affiliated with CRAN or the R Project.
* The primary goal of this site is to make tracking package submissions more accessible.
* Both backend and frontend are fully open source and available on GitHub.
* To minimize traffic to the CRAN network, the backend lazily fetches data from the CRAN incoming FTP server (ftp://cran.r-project.org/incoming/) and caches it in memory. (This means when nobody is looking at this page, there will be no traffic to CRAN and there is no increased traffic for concurrent users.)
* A big shout-out to the CRAN members reviewing many packages every week.

## Alternatives
* [r-hub/cransays CRAN incoming dashbord (website)](https://r-hub.github.io/cransays/articles/dashboard.html)
* [CRAN incoming FTP (website)](https://cran.r-project.org/incoming/)
* [foghorn (R package)](https://cran.r-project.org/web/packages/foghorn/index.html)

## References
* [R journal (2017): Changes on CRAN (Kurt Hornik, Uwe Ligges and Achim Zeileis)](https://journal.r-project.org/archive/2018-1/cran.pdf)
* [[R-pkg-devel] Meaning and consequences of action pending in the submission pipeline](https://stat.ethz.ch/pipermail/r-package-devel/2019q1/003631.html)
* [CRAN Analysis: Edgar Ruiz (2018)](https://github.com/edgararuiz-zz/cran-stages)