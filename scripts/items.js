var launchItems = [
   2, "https://image.tmdb.org/t/p/w500/fELdVq2KuqW8vWEeb1vi6IfDRSO.jpg",
   3, "https://image.tmdb.org/t/p/w500/7ad4iku8cYBuB08g9yAU7tHJik5.jpg",
   5, "https://image.tmdb.org/t/p/w500/eQs5hh9rxrk1m4xHsIz1w11Ngqb.jpg",
   6, "https://image.tmdb.org/t/p/w500/oMjuWHyumyA7MMcSUzOS2ROJBvB.jpg",
   8, "https://image.tmdb.org/t/p/w500/8YyIjOAxwzD3fZMdmJrfiApod4l.jpg",
   11, "https://image.tmdb.org/t/p/w500/tvSlBzAdRE29bZe5yYWrJ2ds137.jpg",
   12, "https://image.tmdb.org/t/p/w500/zjqInUwldOBa0q07fOyohYCWxWX.jpg",
   13, "https://image.tmdb.org/t/p/w500/z4ROnCrL77ZMzT0MsNXY5j25wS2.jpg",
   14, "https://image.tmdb.org/t/p/w500/or1MP8BZIAjqWYxPdPX724ydKar.jpg",
   15, "https://image.tmdb.org/t/p/w500/n8wfFsQ5vtm6dM8vdgXb6OLv2GY.jpg",
   16, "https://image.tmdb.org/t/p/w500/4Zz2aX5ZrwebgxdIhPCXBKxFSVO.jpg",
   17, "https://image.tmdb.org/t/p/w500/8fzjzQhLXl1afshhsE5Y3MGuco4.jpg",
   18, "https://image.tmdb.org/t/p/w500/zaFa1NRZEnFgRTv5OVXkNIZO78O.jpg",
   19, "https://image.tmdb.org/t/p/w500/qriaeUUwdmlgethK3aSAx68mG05.jpg",
   20, "https://image.tmdb.org/t/p/w500/vVj92VBFUBzjqzLvBiPVVlJDp78.jpg",
   21, "https://image.tmdb.org/t/p/w500/jqsZQPxeMjcvVN5aFGgAk7qQodr.jpg",
   22, "https://image.tmdb.org/t/p/w500/tkt9xR1kNX5R9rCebASKck44si2.jpg",
   24, "https://image.tmdb.org/t/p/w500/vdENJAPObttowMtIwe9jgtbsEnq.jpg",
   25, "https://image.tmdb.org/t/p/w500/iEYnXqUsfTaKwO1svSa39Ap07of.jpg",
   26, "https://image.tmdb.org/t/p/w500/2lMVKr9EtBuNvp0nCEFt207bykA.jpg",
   27, "https://image.tmdb.org/t/p/w500/bvGyYmmnQG5NPP7m2nuLhaiC8LH.jpg",
   28, "https://image.tmdb.org/t/p/w500/l8dn7rKbjP36PtHsViHGpzf5ey7.jpg",
   30, "https://image.tmdb.org/t/p/w500/1A59xquD5rZeQRgjMfI4qu1ZvcQ.jpg",
   31, "https://image.tmdb.org/t/p/w500/5LRT8RxXsEg7Ni0YCa2p6R9Ogn.jpg",
   32, "https://image.tmdb.org/t/p/w500/oJdlkTtDvvpgagO2JWBBxGq5mMN.jpg",
   33, "https://image.tmdb.org/t/p/w500/km6qw4qUkHQRN5y2U1juM1WkBFh.jpg",
   35, "https://image.tmdb.org/t/p/w500/eCytnEriVur3rT47NWfkgPXD9qs.jpg",
   55, "https://image.tmdb.org/t/p/w500/8gEXmIzw1tDnBfOaCFPimkNIkmm.jpg",
   58, "https://image.tmdb.org/t/p/w500/waFr5RVKaQ9dzOt3nQuIVB1FiPu.jpg",
   59, "https://image.tmdb.org/t/p/w500/mz1qCHXxTUJm2AqOdW3IIpwYdo3.jpg",
   62, "https://image.tmdb.org/t/p/w500/90T7b2LIrL07ndYQBmSm09yqVEH.jpg",
   63, "https://image.tmdb.org/t/p/w500/6Sj9wDu3YugthXsU0Vry5XFAZGg.jpg",
   64, "https://image.tmdb.org/t/p/w500/klsBB1YEGRyC7YjiLYCKIqkU6pY.jpg",
   65, "https://image.tmdb.org/t/p/w500/dXzTrKwpbLpCqn8O70FUUhNbYQT.jpg",
   66, "https://image.tmdb.org/t/p/w500/oJQdp09Oc51DkArsMDvgDLdWiDu.jpg",
   67, "https://image.tmdb.org/t/p/w500/ztEEni4ISi8Mv279pFbTg9F9xPX.jpg",
   68, "https://image.tmdb.org/t/p/w500/55Vfc1beLn3pJF4Lw83TRKHenK6.jpg",
   69, "https://image.tmdb.org/t/p/w500/nUsaYt9Wk4fVP8jp1ncfQe7Io7t.jpg",
   70, "https://image.tmdb.org/t/p/w500/h4VZKi2Jt4VoBYJmtC4c3bO8KqM.jpg",
   71, "https://image.tmdb.org/t/p/w500/x0ySHQPAxQYD0D79BeDY2XhPzXg.jpg",
   73, "https://image.tmdb.org/t/p/w500/fXepRAYOx1qC3wju7XdDGx60775.jpg",
   74, "https://image.tmdb.org/t/p/w500/xXMM9KY2eq1SDOQif9zO91YOBA8.jpg",
   75, "https://image.tmdb.org/t/p/w500/sM4VrptBRIFHmN7mLJZ2BaGKYNq.jpg",
   76, "https://image.tmdb.org/t/p/w500/9NBjDNPHA6SkThIweOs8iCfsA8a.jpg",
   77, "https://image.tmdb.org/t/p/w500/fQMSaP88cf1nz4qwuNEEFtazuDM.jpg",
   78, "https://image.tmdb.org/t/p/w500/p64TtbZGCElxQHpAMWmDHkWJlH2.jpg",
   79, "https://image.tmdb.org/t/p/w500/25mPUxUgI7ohcKcoiyQ5lNGqmFJ.jpg",
   80, "https://image.tmdb.org/t/p/w500/cIj6yWJKUjdCCO7vuZQKl0NqCQe.jpg",
   81, "https://image.tmdb.org/t/p/w500/y2rl0OkMfZHpBaQYPfSJmLMOxwp.jpg",
   82, "https://image.tmdb.org/t/p/w500/3BsNsigWcET4tKLZZhJegw7eOjF.jpg" 
];

var personItems = [
  3223,
  116
];