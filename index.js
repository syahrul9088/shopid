const fetch = require('node-fetch');
const readlineSync = require('readline-sync');
const cheerio = require('cheerio');

const functionGetUser = (user) => new Promise((resolve, reject) => {
    fetch(`https://www.tokopedia.com/${user}?source=universe&st=product`, {
        method: 'GET',
        headers: {
            'Host': 'www.tokopedia.com',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36',
            'Sec-Fetch-User': '?1',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'navigate',
            'Referer': 'https://www.tokopedia.com/brpindonesia?source=universe&st=product',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            //'Cookie': '_abck=43EFF4837ED2CB0465B50BF0BDCC298A~0~YAAQzuF4coCoRHRuAQAA3ARtmAMunNndclgUhhZ4U2UcudqzCQD5CBES1LMVJQg03p1JrvWhld0Agz5jWmqUT4CwlM5VOIsxDdQHX/XZOD+4rBt+RRWX4HJJWbg74BK8jlTc1+PZ2IP070lnjbkLbcK8YZHx+46rmXPSfRHhDoRqnKE1mWm/s0Cq6ZOQYNb0XYUwNvPIgoxaw9oZMNu9ttN9dl1oP6wisboIpo1UTNHiNPaXkeSutVPRgyCf8cPiZ4J8L5cHpxoGUKqKcH468StGsLSgONKsUhIr0xMVMGUiocz0cVUUm4SGq0tIeG1RWGBSiWsOc2elfg==~-1~-1~-1; _ID_autocomplete_=08e47153e8c149ec857af2dbffce7116; DID=a2c909c4fdcfde4702bcb09d29dd3b7de97068a7110e64c0be40b24264b03d021635e6c6dc9b8ad84fa68118d62053a6; __auc=311959cd16f986d074713769ffa; _gcl_au=1.1.2104683469.1578810280; _ga=GA1.2.698409372.1578810280; _fbp=fb.1.1578810281278.1254585772; _hjid=875be519-631a-46c1-b40d-9f8f20b3f2cc; S_L_a86ee644eeb0ae3e4e972a609a753ed0=195b50ed21a20d7041ca06fe43052e4a~20200411132734; lasty=9; TOPATK=VwUq2E1YRAiqDHfn7mypCg; TOPRTK=EXPxFG7yQVevDo6OgluPlg; isWebpSupport=true; _ID_autocomplete_=08e47153e8c149ec857af2dbffce7116; zarget_visitor_info=%7B%7D; _BID_TOKOPEDIA_=91df2909369f3457f2df7165af9e452e; lang=id; CSHLD_SID=f48d44416051693388dfe1d219b8001bc42bf455ac1c495b4f215cbd5cff8740; CS_FPC=CSCdGg6v6i29jPCzNHLP72TtiEsT17265mH; fe_discovery_experiments=%7B%220%22%3A%7B%22topads_cpm_exp_abc%22%3A%7B%22name%22%3A%22topads_cpm_exp_abc%22%2C%22selected%22%3A%22old-cpm%22%7D%7D%2C%2220945279%22%3A%7B%22topads_cpm_exp_abc%22%3A%7B%22name%22%3A%22topads_cpm_exp_abc%22%2C%22selected%22%3A%22old-cpm%22%7D%7D%7D; bm_sz=68C64B4A532811DF769DF52514C57C93~YAAQvuF4copk7IhuAQAAtBn2xgbBrkK77NYv2LrK3dRkYPYOep4wknpV/Xunes1VkWJLlf7HGovhRHeVnSuYE9mcvmbS0PlJD3Laf/iipO1tPZPCvzX+z6Q+f5Z2MGXMoLlg40AMsZgrFluUICe8SmLgZZ7DmjWexHB2UQSeVcrvywlBljP0sEYQEB0PSvwgOwmD; _SID_Tokopedia_=VOXi25a3fXAjBTiwhWLQY6Ap8rbZdVvFhoewYwdQVqpAT7nMWuOxp1zk8S2N2rYwpwUF68Ll1HiY-_NMZS25H8briMw2pDRc4wvVWzBZfVzUu31OCoPWLZb9fdciSghy; __asc=7ce5b5a016fc6f63bfd78e1290f; ak_bmsc=E4C79547FCC72F1566645E9C78C76C4F7278E1BE4460000066A5265EEFC3BC27~plH1uB1o7FV/U9a6zRrvA4ce2H9ZtJAj6Rg328itRouFpZlSzQcPE6xseUpu0mJNUvBGbqgRBaErK4zOg7ytCi3870aWkOdi8rx31kYG1f6lNw3sFFxHM0HfyVbyWi8uaNfNEk93AzMb+PtEc5NR1UqJh7Rfy39OXUxMPUpyteo4ON9Ev1PkEMgkMyAfxrkrq8A7FlHrkmoYXk7t0nZ+kjcTxzZaGpA5lkK3+q837ZRxJCN11oIRDn9CUU3+n6HlOM; _gid=GA1.2.42359684.1579591025; rl_r=365; rl_d=%5B%7B%22f%22%3A%22stickywidgetv2%22%2C%22v%22%3A%22%22%7D%5D; RT="z=1&dm=tokopedia.com&si=7723ef02-b110-4af7-a574-563059663be0&ss=k5njphhr&sl=0&tt=0&bcn=%2F%2F684d0d3e.akstat.io%2F&nu=8073e91e2b9ab9da41c0219428972ea6&cl=lo8&r=fb966188c7eeca5df7df11c73d02c1b4&ul=lpv&hd=mir"; state=eyJsZCI6Imh0dHBzOi8vd3d3LnRva29wZWRpYS5jb20vYnJwaW5kb25lc2lhP3NvdXJjZT11bml2ZXJzZVx1MDAyNnN0PXByb2R1Y3QiLCJyZWYiOiJodHRwczovL3d3dy50b2tvcGVkaWEuY29tL2JycGluZG9uZXNpYT9zb3VyY2U9dW5pdmVyc2VcdTAwMjZzdD1wcm9kdWN0IiwidXVpZCI6IjJlYmRmMWI5LTkxOWYtNDVlMC1iMGEyLWEyZWRkNDdiNzljMiIsInAiOiJodHRwczovL3d3dy50b2tvcGVkaWEuY29tIn0; bm_sv=F8B79E35E7B4E1EFCB1C6F9B1DD395A6~6NpF0dHwI5Xc7BxkAX5v+Wu0k+DgBzyTrKJ8GipHvWQqz+xHKMGrV/ULE4tocVVZhMD0+pTFJ48Rd7dW7jVrRjN4cUHuIeRIM052yrHB0XQ6se8BtAPWO2AzPG97Ddo2zbkl3pimHCX2NPFHRM6mVtUKmfykvDt8P4RW3PZhaXc=; ISID=%7B%22www.tokopedia.com%22%3A%22d3d3LnRva29wZWRpYS5jb20%3D.8264946ce351b4ba4946a43486f741b5.1578810283938.1579428724461.1579591027171.44%22%7D; _gat_UA-9801603-1=1'
        }
    })
    .then(res => res.text())
    .then(result => {
        const $ = cheerio.load(result)
        resolve(result)
    })
    .catch(err => reject(err))
});

(async () => {
    try {
        const user = readlineSync.question('[?] Username: ')
        const get = await functionGetUser(user)
        const ss = get.split('window.__initMerchantCache')[1]
        const aa = ss.split("\\")[24]
        const bb = aa.split('":[')[1]
        const idToko = bb.split(']}}).result.0.shippingLoc":{"districtName":"')[0]
        console.log(`[+] Shop ID: ${idToko}`)
    } catch (e) {
        console.log(`[!] Username salah!`)
    }
})()
