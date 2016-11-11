const html = '<blockquote>\n<p>最近国内公有云服务商掀起了一轮降价浪潮，继阿里云上月宣布降价之后，腾讯云也在本月初推出全线降价优惠。<a href=\"http://www.codingpy.com/article/a-comparison-of-qcloud-and-aliyun-products/\" rel=\"nofollow\">本文</a>希望从云计算用户的角度，通过真实的产品使用、评测，对降价后各家的产品性价比进行较为全面的对比。对应的<a href=\"https://github.com/bingjin/CloudTesting\" rel=\"nofollow\"> Github 项目地址</a>。</p>\n</blockquote>\n<p>大约一年前，我在某国外云厂商上部署了<a href=\"http://codingpy.com\" rel=\"nofollow\">自己的第一个网站</a>，从此成为一名云计算用户。由于国内用户访问不便，前段时间我将网站迁回了国内，并记录下了大致的迁移过程。其中开篇简要说明了最终选择的国内云服务商（腾讯云），但并没有对背后的具体原因做深入的解释。</p>\n<p>本文打算从性能评测和价格等角度，做一下说明。</p>\n<h2>云计算市场争夺</h2>\n<p>阿里云作为名副其实的国内业界第一，名声非常大，不过最近 IT 之家的事闹出来之后，我有点庆幸最终没有选择它。腾讯云算是业界老二，而且有着腾讯这个强大的靠山，云服务产品的种类和质量都不错。</p>\n<p>上个月阿里云在云栖大会上宣布降价，昨天<a href=\"https://www.qcloud.com/act/event/all-discount.html?utm_source=Zhihu&amp;utm_medium=Community&amp;utm_campaign=Community\" rel=\"nofollow\">腾讯云方面也推出了全线降价活动</a>，对包年包月产品均提供了大幅度的降价优惠。阿里和腾讯在云计算领域之争继续上演，双方都想通过价格优势带来用户的高增长，抢夺市场份额。</p>\n<p>这对于云计算用户来说自然是一件好事，但是<strong>如果让价格完全左右企业或个人用户的购买决策的话，那么最终很可能会出现已购产品无法满足需求，从而不得不被迫迁移的情况</strong>。笔者的观点很简单，在考虑价格因素之前，应该先从产品性能、服务等多方面进行评估。</p>\n<p>在选择自己的云服务器之前，我也在腾讯云和阿里云之间犹豫过，并对两家的产品做过一些简单的对比。下文中会简要分享一下对比结果。</p>\n<p>在对比每一款产品时，本文先通过一系列的标准化测试比较产品的性能，然后再结合产品的最新优惠价格因素进行评价。至于两家的产品到底谁的性能更好、性价比更高，一切还是要用数据说话。</p>\n<blockquote>\n<p>本文采用的测试工具和方法介绍，请查看配套文章：<a href=\"\" rel=\"nofollow\">云计算产品性能测试指南</a>。对象存储部分的脚本可在<a href=\"https://github.com/bingjin/CloudTesting\" rel=\"nofollow\"> Github 项目</a>中查看。阅读期间，如果你觉得具体对比过程太长，可以直接跳到本文结语部分查看对比结论。</p>\n</blockquote>\n<h2>选择对比产品</h2>\n<p>腾讯云和阿里云都是典型的 IaaS 服务商，产品种类繁多。限于时间和成本，没办法对所有产品进行一一对比，只能有选择性地比较一些基础产品和服务。</p>\n<p>根据<a href=\"http://media.amazonwebservices.com/architecturecenter/AWS_ac_ra_web_01.pdf\" rel=\"nofollow\"> AWS Web 应用参考架构</a>，一个高可用、可伸缩的网站至少需要使用以下云计算资源：云服务器、云数据库、对象存储服务、负载均衡、内容分发等。因此我们在本文中主要对比云服务器、云数据库和对象存储这三个比较基础的产品。</p>\n<p><img alt=\"网站参考架构图：以 AWS 服务为例\" src=\"https://pic4.zhimg.com/v2-eb5f33317713b3d69e2d9a2501590c19.png\">\n&lt;small&gt;网站参考架构图：以 AWS 服务为例。&lt;/small&gt;</p>\n<p><img alt=\"对比产品的英文简称\" src=\"http://ww2.sinaimg.cn/large/65e4f1e6gw1f9ggcjuhqvj20om07m3z7.jpg\"></p>\n<p>&lt;small&gt;对比产品的英文简称&lt;/small&gt;</p>\n<p>下文在谈到对应产品时，将使用其简称表示。</p>\n<h2>云服务器对比</h2>\n<p>云服务器是所有云计算服务商提供的最基础产品。厂商一般会根据分配的资源划分云服务器的级别和规格。但是<strong>由于采用的基础硬件、架构和调优技术存在差别，类似配置的云服务器之间也可能有较大的性能差异</strong>。</p>\n<p>如果想了解并比较不同厂商云服务器的差异，最好的方式就是运行基准测试。</p>\n<h3>性能测试准备</h3>\n<p>在开始测试之前，我们先在两家创建相同配置的两台云服务器，尽量确保测试结果之间具备可比性。付费方法均采用按量计费，使用包年包月服务器进行测试的成本较高。</p>\n<p>腾讯云和阿里云针对按量计费的云服务器，均要求账户内有一定的余额：腾讯云好像没有最低充值要求，充值 10 元即可；阿里云要求账户内至少有 100 元余额。</p>\n<p>测试云服务器的具体配置如下：</p>\n<p><img alt=\"测试云服务器的具体配置\" src=\"http://ww2.sinaimg.cn/large/65e4f1e6gw1f9ggf8hng9j20ok0im40l.jpg\"></p>\n<p>这里指出一点，由于阿里云 ECS 云硬盘最小为 40G ，而腾讯云 CVM 默认 Linux 系统赠送 20G ，为了在后面对比二者价格时有可比性，将 CVM 的云硬盘调整为 40G 。</p>\n<p>除了系统盘默认大小不同外，测试云服务器在 CPU 、内存、操作系统等方面均为同一规格的配置。这个规格的配置也是中小型网站部署的推荐配置，应该能够满足大部分用户的需求。</p>\n<h3>性能测试过程</h3>\n<p>由于测试的流程比较长，在本文中只简要介绍下所使用的工具及对应关注的指标。具体的测试操作步骤，我会在<a href=\"http://www.codingpy.com/article/guide-on-testing-cloud-products/\" rel=\"nofollow\">云计算产品性能测试指南</a>中介绍。</p>\n<p>在测试云服务器之前，我参考了许多相关评测文章，最终决定使用如下工具和指标：</p>\n<p><img alt=\"使用如下工具和指标\" src=\"http://ww4.sinaimg.cn/large/65e4f1e6gw1f9gghw3kjmj20kk0cmjsu.jpg\"></p>\n<p>有关其中所使用工具和指标的具体说明，请移步到这里：<a href=\"http://www.codingpy.com/article/guide-on-testing-cloud-products/\" rel=\"nofollow\">云计算产品性能测试指南</a>。</p>\n<h3>性能测试结果</h3>\n<p>GeekBench 会将测试结果上传到自己的网站，本文测试结果的访问地址如下：</p>\n<ul>\n<li><a href=\"https://browser.geekbench.com/v4/cpu/917594\" rel=\"nofollow\">CVM</a></li>\n<li><a href=\"https://browser.geekbench.com/v4/cpu/917178\" rel=\"nofollow\">ECS</a></li>\n</ul>\n<p>各项指标结果汇总如下：</p>\n<p><img alt=\"云服务器性能测试结果：腾讯云、阿里云\" src=\"http://ww4.sinaimg.cn/large/65e4f1e6gw1f9es52r3jwj20og0c4jt9.jpg\"></p>\n<p>从数据来看，腾讯云的 CVM 在 UnixBench 和 GeekBench 两个综合性测试工具下的得分都高于阿里云的 ECS 。</p>\n<p><img alt=\"UnixBench 和 GeekBench 两个综合性测试工具\" src=\"http://ww1.sinaimg.cn/large/65e4f1e6gw1f9esdebbf7j20ua0mcq3y.jpg\"></p>\n<p>CPU 延迟和内存性能方面， ECS 略胜一筹，但是优势不大。在磁盘 I/O 性能上，阿里云的表现接近在启动实例配置时所介绍的 500 IOPS 。但是与腾讯云相比逊色不少，<strong>CVM 的磁盘随机读 /写的 IOPS （每秒的输入输出量，或读写次数）均在 4000 左右</strong>。</p>\n<p><img alt=\"磁盘 I/O 性能\" src=\"http://ww3.sinaimg.cn/large/65e4f1e6gw1f9esevf4ykj20u20mu0tw.jpg\"></p>\n<p>其实看到二者在磁盘 I/O 性能上差距居然这么大，笔者刚开始很诧异，还以为测试命令输入有误，不过反复测试确认之后，可以证实<strong>这个数据并没有错</strong>。同时也向客服方面了解，得到的回复是： CVM 的磁盘 I/O 最大性能指标的确可以达到 4000 ，但是并不承诺一直保持该性能。这点可以理解，随着租户的增加，最大性能指标很有可能会逐步下降。</p>\n<p>最后要注意的是，虽然我们使用了知名的基准测试工具，但是具体的数据可能并不能精确地说明云服务器的性能。<strong>因为云服务器的性能和相邻租户使用情况是相关的，根据其他租户的使用情况而不同</strong>，因此以上数据仅作参考使用。</p>\n<h3>考虑价格因素</h3>\n<p>最后我们来加入价格因素。阿里云此前在云栖大会上宣布云产品大幅降价，近期<a href=\"https://www.qcloud.com/act/event/all-discount.html?utm_source=Zhihu&amp;utm_medium=Community&amp;utm_campaign=Community\" rel=\"nofollow\">腾讯云方面也趁着双十一宣布了一轮降价</a>，那么我们结合上面的性能测试结果，来看看降价之后两家的性价比如何。</p>\n<p><img alt=\"云服务器价格对比\" src=\"http://ww2.sinaimg.cn/large/65e4f1e6gw1f9gak8zfhfj20wi0mo76q.jpg\">\n&lt;small&gt;上图中的价格信息取自 11 月 4 日创建实例时显示的价格。&lt;/small&gt;</p>\n<p>从包月费用来看，腾讯云 CVM 比 ECS 要贵那么一丁点，不过考虑到它的性能评分就会觉得贵的物超所值了。但是从之后的二、三年优惠价来看， CVM 的费用反而要低于 ECS 相应期限的成本了。如果两家的降价幅度相同的话，那价格应该是阿里云一直便宜一些才对啊？</p>\n<p>确实，背后的原因就是在于二者的降价幅度不同：阿里云是中国区域实例最高 3 年 5 折，带宽和系统盘并没有这么高的折扣，只有 8.5 折。</p>\n<p><img alt=\"阿里云折扣截图\" src=\"http://ww3.sinaimg.cn/large/65e4f1e6gw1f9gah5inlgj20ha0pgdj3.jpg\"></p>\n<p>相比之下，<strong>CVM 是真正的全线降价</strong>，三年实例、带宽和系统盘费用都是 5 折优惠。</p>\n<p>因此，这段时间内购买<strong>腾讯云 CVM 的性价比是要高于阿里云 ECS 的</strong>，尤其是购满 2-3 年的话。</p>\n<h2>云数据库对比</h2>\n<p>我们接着对比两家的基础云数据库： CDB 和 RDS 。</p>\n<p>目前虚拟化技术已经取得很大的进展，可以将物理机虚拟化为多个云服务器，而且能做到总体性能的损耗最小。因此，网站的性能差、响应慢，可能不是你的应用代码写的不好，瓶颈很可能就在于云数据库的性能。因此，选择云服务商的云数据库性能，也是决定购买决策的一个重要因素。</p>\n<p>由于 MySQL 是网络上使用最为普遍的数据库，腾讯云和阿里云两家基础的数据库产品也都是基于 MySQL 的，因此在这项评测上我们选择 MySQL ，版本为 5.6 。</p>\n<h3>测试准备工作</h3>\n<p>两家的云数据库目前只提供一种配置类型，分别是高 IO 版（ CDB ）和双机高可用版（ RDS ）。因此在这项测试中，使用一组完全相同配置的云数据库是不可能，只能转而使用同价位级别的服务器。</p>\n<p>基于上述原因，我们分别在腾讯云和阿里云创建最低配版的云数据库（ CDB 和 RDS ）。具体配置如下表所示：</p>\n<p><img alt=\"云数据库配置\" src=\"http://ww2.sinaimg.cn/large/65e4f1e6gw1f9ggk676z2j20kg09g755.jpg\"></p>\n<p>从官方划分的类型和内存大小来看，这应该是一组可比较的实例。另外，为了降低测试时网络的影响，我们继续使用对比云服务器时创建的实例，来运行测试代码。</p>\n<h3>测试过程</h3>\n<p>MySQL 云数据库有许多性能测试工具，如自带的 mysqlap 。本文所选择的是 sysbench 。</p>\n<p>Sysbench 是一个模块化的、跨平台、多线程基准测试工具，主要用于评估测试各种不同系统参数下的数据库负载情况。还可以用来测试 CPU 性能、磁盘 I/O 性能等指标。我们用到的是其提供的 OLTP 基准测试，默认支持 MySQL 数据库。</p>\n<p>Sysbench 的安装及测试方法请看<a href=\"http://www.codingpy.com/article/guide-on-testing-cloud-products/\" rel=\"nofollow\">云计算产品性能测试指南</a>的云数据库部分。本文中执行了随机读写、随机只读两种测试。</p>\n<p>OLTP 测试输出结果如下图所示：</p>\n<p><img alt=\"腾讯云 CDB ： sysbench 随机只读测试结果\" src=\"http://ww1.sinaimg.cn/large/65e4f1e6gw1f9eunr31cvj212q0vcqau.jpg\">\n&lt;small&gt;腾讯云 CDB ： sysbench 随机只读测试结果&lt;/small&gt;</p>\n<p>我们需要关注的数据包括测试完成的事务总数，即图中的 read/write requests ，表示数据库的吞吐量；以及平均请求时间，即图中 per-request 数据下的 avg 对应的值，表示数据库请求的延迟。</p>\n<h3>性能测试结果</h3>\n<p>这里只用到了一种测试工具，而且测试的类型也不多，因此很快我们就可以得到测试结果，将其中我们需要的数据提取出来，可以得到下图中的对比数据。</p>\n<p><img alt=\"云数据库性能测试结果\" src=\"http://ww1.sinaimg.cn/large/65e4f1e6gw1f9eushnxfkj213604uab1.jpg\"></p>\n<p>从结果可以看出，腾讯云 CDB 的数据库读写请求吞吐量相比 RDS 来说高很多，是后者的约 6-7 倍左右，请求的响应时间也非常快，在 10ms 以内。高 I/O 版本的表现的确强劲。</p>\n<h3>考虑价格因素</h3>\n<p>最后我们考虑二者的价格因素。</p>\n<p>两家最新的优惠价格对比如下：</p>\n<p><img alt=\"云数据库价格对比\" src=\"http://ww3.sinaimg.cn/large/65e4f1e6gw1f9fydq7744j20ua0moacf.jpg\"></p>\n<p>&lt;small&gt;以上价格信息取自 11 月 4 日创建实例时显示的价格，区域分别为： CDB 广州， RDS 华南 1&lt;/small&gt;</p>\n<p>至于另一个费用来源——网络流量费用，如果使用两家对应的云服务器的话，与云数据库之间就是内网流量，应该都是免费的。所以流量费用问题可以忽略。</p>\n<p>从上图我们可以得出，两家在包月价格上差异不大，但是就<a href=\"https://www.qcloud.com/act/event/all-discount.html?utm_source=Zhihu&amp;utm_medium=Community&amp;utm_campaign=Community\" rel=\"nofollow\">此次降价幅度</a>来看，腾讯云 CDB 的优惠非常之高：二、三年的优惠价（ 4 折、 3 折）是 RDS 的一半；一年、二年和三年购买期限处在同一个价位段，而且买两年的价格比一年还低。</p>\n<p>如果 Web 应用要求大量快速的数据库读取操作，那么在购买期限为二、三年的情况下，配置两台 CDB 高 IO 版也比选择 RDS 的性价比要高。</p>\n<p>如果数据库请求在 RDS 测试结果之内，使用期限也不长，那么可以考虑使用 RDS 。</p>\n<p>另外提示一点，<strong>虽然说 CDB 的版本介绍为高 I/O 版，但是<a href=\"https://www.qcloud.com/doc/product/236/3189\" rel=\"nofollow\">据官方的产品文档</a>，每一个 CDB 实例都做了实时双机热备</strong>，因此在可用性方面的表现应该也不会差太多（这里我们没有对此进行测试）。</p>\n<h2>对象存储服务对比</h2>\n<p>到最后一个产品了。</p>\n<p>对象存储服务的对比有点麻烦，没有比较好用的基准测试工具。在准备测试之前，我发现 Intel 公司开源了一个专门测试云对象存储的工具，叫做 COSBench ，不过可惜的是只支持 Amazon S3 等国外云厂商的服务，不支持腾讯云和阿里云。当然好像可以自己实现对应的适配器，但是对于本文这个较为简单的评测来说，有点太过麻烦了。</p>\n<p>因此，在对比对象存储服务时，我使用两家提供的 Python SDK ，编写了测试脚本来统计上传、下载和删除等三个任务的用时。注意，这里并没有测试高并发的情况。</p>\n<h3>性能测试方法</h3>\n<p>为了控制网络环境对测试结果的影响，我在腾讯云和阿里云各自同区域的云服务器上进行测试，这样不仅测试起来会比较方便，而且能确保测试结果准确有效。我在两家创建的对象存储 Bucket 都是位于华南区的，因此在相应区域分别创建了一台云服务器实例。</p>\n<p>同时，为了尽量模拟实际用户的使用场景，我们选择 50KB 、 2MB 、 50MB 三种级别的文件进行测试。一般网络图片的大小在 50K - 2MB 左右，通过这两个级别文件可以测试图片数据存储的效率。另外 50MB 级别用于测试大文件存储性能。</p>\n<p>具体来说，我们通过 <code>dd</code> 命令生成：</p>\n<ul>\n<li>10000 个 50KB 文件</li>\n<li>1000 个 20MB 文件</li>\n<li>100 个 50MB 文件</li>\n</ul>\n<p>测试时统计文件上传 /下载 /删除用时等指标，取平均值（单位毫秒）。在测试小文件下载用时时，并没有将文件保存到磁盘，避免了磁盘成为性能瓶颈。</p>\n<h3>性能测试结果</h3>\n<p>由于测试文件数量不少，整个测试脚本跑下来可能要一个多小时。最终针对 COS 和 OSS 的测试结果（均为单个文件平均值）如下。</p>\n<h4>50KB 小文件</h4>\n<p><img alt=\"50KB 小文件\" src=\"http://ww2.sinaimg.cn/large/65e4f1e6gw1f9evu3z6nrj20vs0niabh.jpg\"></p>\n<p>在 50KB 小文件这个类别中，阿里云 OSS 的上传、删除用时表现不错，小文件下载用时方面腾讯云 COS 用时较少。</p>\n<h4>2MB 小文件</h4>\n<p><img alt=\"2MB 小文件\" src=\"http://ww1.sinaimg.cn/large/65e4f1e6gw1f9evupccjrj20vw0oodgy.jpg\"></p>\n<p>随着文件大小的增加，腾讯云 COS 在上传、下载用时这两项指标上开始超越 OSS ，差距以倍数计。不过 OSS 在删除用时上仍然保持在 10ms 左右。</p>\n<h4>50MB 大文件</h4>\n<p><img alt=\"50MB 大文件\" src=\"http://ww1.sinaimg.cn/large/65e4f1e6gw1f9evuyq9z7j20vg0oajsr.jpg\"></p>\n<p>由于 50MB 文件的上传、下载、删除用时之间级别相差较大，因此我在绘制图表时将纵轴改为了对数可读，方便阅读。本文测试的实际数据如下表所示：</p>\n<p><img alt=\"50MB 大文件本文测试的实际数据\" src=\"http://ww3.sinaimg.cn/large/65e4f1e6gw1f9ew33n984j20kk06g3z7.jpg\"></p>\n<p>在上传大文件时， OSS 与 COS 之间的性能差异显得尤为突出。</p>\n<p>综合来看：</p>\n<ul>\n<li>阿里云 OSS 在处理文件上传时，随着文件大小增加，性能在逐步下降；下载用时与 COS 相差不大；文件删除用时均优于 COS ，不过文件越大，用时会有对应增加。</li>\n<li>腾讯云 COS 在文件上传上的性能比较突出，尤其是大文件；下载用时表现也不错；文件删除虽然总体不及 OSS ，但每类文件删除用时均保持在相同的水平。</li>\n</ul>\n<p>如果将三个指标结合在一起，腾讯云 COS 的表现要好于阿里云 OSS 。</p>\n<h3>考虑价格因素</h3>\n<p>我们接下来看价格因素，以一个想象中的网站示例来对比。</p>\n<p>假设一个网站的存储数据有 1.5 TB （图片、音频、视频），每月产生流量 600 GB ，月 PV 大约 300 万，同时每月读请求 600 万次，写请求 30 万次（平均日请求 21 万）。</p>\n<p>我们使用上面的网站数据，通过官方提供的价格计算器（<a href=\"https://buy.qcloud.com/calculator/cos\" rel=\"nofollow\">COS</a>、<a href=\"https://www.aliyun.com/price/product#/oss/calculator\" rel=\"nofollow\">OSS</a>）来计算使用 OSS 和 COS 的价格。</p>\n<p>由于腾讯云 COS 目前只提供按量计费模式，因此对比的计费方式均选择为按量计费。</p>\n<p>结果如所示：</p>\n<p><img alt=\"阿里云 OSS 按量计费价格（区域选择为华南）\" src=\"http://ww4.sinaimg.cn/large/65e4f1e6gw1f9eq5jbpfpj21dq14g0xd.jpg\"></p>\n<p><strong>阿里云 OSS 按量计费价格（区域选择为华南）： 616.7 元 /月。</strong></p>\n<p><img alt=\"腾讯云 COS 按量计费价格\" src=\"http://ww3.sinaimg.cn/large/65e4f1e6gw1f9eq0z3t4mj21aa13sq73.jpg\"></p>\n<p><strong>腾讯云 COS 按量计费价格： 593.4 元 /月。</strong></p>\n<p>上面在计算价格时，并没有加入 CDN 因素。不过两家在介绍产品时都提到了，如果设置 CDN 加速或回源，价格会更低。</p>\n<p>腾讯云在上面的计费对比中胜出的原因，可能与<a href=\"https://www.qcloud.com/act/event/all-discount.html?utm_source=Zhihu&amp;utm_medium=Community&amp;utm_campaign=Community\" rel=\"nofollow\">其推出的免费额度</a>有关。目前，每个 COS 用户都有每月 50G 的免费存储空间， 10G 的免费流量，以及 100 万次免费读请求和 10 万次免费写请求。阿里云在 2015 年时曾推出过免费 OSS 额度，但是目前已经没有了。</p>\n<h2>结语</h2>\n<p>至此，我们已经完成了对腾讯云和阿里云三个基础性云计算产品的评测对比，兼顾了性能指标和价格因素。具体的评测结果总结如下：</p>\n<ul>\n<li>云服务器：同等配置下，腾讯云 CVM 的整体性能高出阿里云 ECS 不少； CVM 的包月费用略高于 ECS （ 3 块钱），但是此次降价幅度比 ECS 更大，一年期以上购买 CVM 的性价比更高。</li>\n<li>云数据库：由于二者类别不同，测试了各自最低等级配置的 CDB 和 RDS ， CDB 在吞吐量和延迟两项性能指标上均大幅领先；同时降价力度也大于 RDS ，因此可以说 CDB 的性价比远高于 RDS 。</li>\n<li>对象存储：在大小文件的上传、下载和删除几项指标上，腾讯云 COS 和阿里云 OSS 各有得分， OSS 在文件删除上表现不错，但是在大文件上传上要逊色不少； COS 在各项指标上的表现都可圈可点。</li>\n</ul>\n<p>因此，仅仅从这三项产品的性价比来看，腾讯云这次降价进一步增加了其产品的优势。如果让我在这场价格战下选择云计算服务商的话，我会选择腾讯云。而这也是我之前迁移网站时所做的选择。</p>\n<p>不过话又说回来，要评估一家云计算厂商，除了性能和价格之外，还要考虑可用性、可靠性等其他诸多指标（各家之间的差异可能不大）。对后者进行评测涉及的操作更为复杂，并不是本文所能涵盖的。而我上面所做的选择，也主要是基于性能和价格两个因素来考虑的。</p>\n<p>由于时间有限，无法将国内其他云计算厂商的产品一并加入测试，欢迎有兴趣的朋友按照本文所介绍方法对自己所使用的云计算产品进行测试，并将结果分享给我，方便大家参考。也希望本文能够帮助大家选购到满意的云计算产品。</p>\n<p>本文和<a href=\"http://www.codingpy.com/article/guide-on-testing-cloud-products/\" rel=\"nofollow\">配套评测指南</a>中如有任何错误，还请大家指正。</p>\n<h2>参考资料</h2>\n<ul>\n<li><a href=\"http://www.cio.com.cn/eyan/411872.html\" rel=\"nofollow\">2015 年度 PK ，云存储（对象存储）性价比对比评测</a></li>\n<li><a href=\"http://blog.qiniu.com/archives/5010\" rel=\"nofollow\">论云存储服务性能评测的正确姿势</a></li>\n<li><a href=\"http://blog.csdn.net/shaunfang/article/details/11194289\" rel=\"nofollow\">国内公有云对比（ 2 ）- 性能篇</a></li>\n<li><a href=\"https://www.upcloud.com/support/how-to-benchmark-cloud-servers/\" rel=\"nofollow\">How to Benchmark Cloud Servers</a></li>\n<li><a href=\"https://www.upcloud.com/blog/cloud-benchmark-digitalocean-aws-upcloud-slush-2015/\" rel=\"nofollow\">Cloud Benchmark at Slush 2015</a></li>\n<li><a href=\"https://www.cloudsigma.com/benchmarking-cloud-servers-a-cloud-computing-insiders-guide/\" rel=\"nofollow\">Benchmarking cloud servers: A Cloud Computing Insider\'s Guide</a></li>\n<li><a href=\"https://www.binarylane.com.au/support/solutions/articles/1000055889-how-to-benchmark-disk-i-o\" rel=\"nofollow\">How to Benchmark Disk I/O</a></li>\n<li><a href=\"https://www.jamescoyle.net/how-to/1131-benchmark-mysql-server-performance-with-sysbench\" rel=\"nofollow\">Benchmark MySQL Server Performance with Sysbench</a></li>\n<li><a href=\"http://lg.io/2015/10/25/real-world-benchmarking-of-s3-azure-google-cloud-storage.html\" rel=\"nofollow\">Real-world benchmarking of cloud storage providers</a></li>\n</ul>\n';

import HtmlView from '../HtmlView';

export default class TestHtmlView extends Component {
	render() {
		return (
			<HtmlView html={html} />
		)
	}
}