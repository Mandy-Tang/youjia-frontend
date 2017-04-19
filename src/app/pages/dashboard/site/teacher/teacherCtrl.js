/**
 * Created by tangniye on 17/4/14.
 */
(function () {
  'use strict';

  /** @ngInject */
  function teacherCtrl($scope, User, Common, toastr) {
    var vm = $scope;
    var teacher_model_template_url = 'app/pages/dashboard/site/teacher/teacher-model/teacher-model.html';

    vm.tableData = [];
    vm.tableColumns = [
      {name: '中文名称', col: 'chinese_name', show: true},
      {name: '英文名称', col: 'english_name', show: true},
      {name: '毕业学校', col: 'graduated', show: true},
      {name: '毕业专业', col: 'major', show: true},
      {name: '毕业国家', col: 'country', show: true},
      {name: '手机号码', col: 'phone', show: true},
      {name: '更新日期', col: 'update_time', show: true, sort: 'order_update_time'},
      {name: '操作', col: 'id', show: true, class: 'option', html: optionHtml, handler: [view, edit, deleteItem]}
    ];
    vm.tableState = {
      sort: {},
      pagination: {
        page: 1,
        page_size: 10,
        page_total: 50
      }
    };
    vm.tableConfig = {
      add: true,
      delete: true
    };

    vm.callServer = function callServer(queryStr) {
      User.getTeacherList(queryStr).then(function (res) {
        vm.tableData = res.items;
        vm.tableState.pagination.page = res.page;
        vm.tableState.pagination.page_total = res.page_total;
      })
    };

    function optionHtml() {
      var html = '<a ng-click="(item.handler[0])(data)"><i class="iconfont icon-magnifier"></i></a>' +
        '<a ng-click="(item.handler[1])(data)"><i class="iconfont icon-pencil"></i></a>' +
        '<a ng-click="(item.handler[2])(data)"><i class="iconfont icon-delete"></i></a>';
      return html
    }

    vm.add = function () {
      Common.model.promptModel('teacherModelCtrl', teacher_model_template_url, 'md', true, 'common-modal', {
        add: true,
        getdata: vm.pipe
      })
    };

    function edit(data) {
      User.get(data.id).then(function (res) {

        res.photo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAgAElEQVRoQ52bebBk51nef99Ze++++zLbnVUaSaPFkixbiy0TO6ZsLMAlcABDuUIIJCHlFOSPBJKCFKkAZewAFRvHgAoVtiwshAx4lbElG5CsdUYaLbPP3de+vZ7TZz9f6vv63vFIZQhJV81M9/R2nu/dnvd53xadTksahoH6o25CCKSU3/e++k/9VBZhoF4vybKMLInIJWSY5ECeQpZnGIaJaeQYWcCGJwnDlCyTREmMU6ziFB1kBmEaMiG6+KnFYtdCZgnhIGBsvEGx6GKaNnmWksYDDogLvHi2iV86RCpMoigijUzqRcmJAyb7Kh4lc4NgaZtXzlzCdUeYfMcHEb1eR6O6GqhGedXtauBCGOSDNlKYGOq+lKRJSC4FGRYSQZLk5HmOMAyEUEAj1nzBYBBimiZxmuLaBUzbJlPvyyKmrR5eYrHYM5FZSjAIaIxWqZRKmKYCL0mzgP3Zq7x4tk1c2U+amNxzYoyNp/8Ur73JhfMLJFQ4efIihw+PcPOJGVbXWywv9RCe19NAlSWv/vfNYHcfSwyy3iZYtgYqZU4UhaCsaVhkGPqi8lzqQ8jyFJuUpV5OFEYaqPICBdSwXFJDINKQKbtPP7ZY7AtELvE8n5HRGtVyWRtB5hCnAfvleVo9m0rJYVrMUx8v8xcPPMIjj5/lzjvmKDkmaRrzzEvzVJwiCItyMR8C3bXm9wO3ewD6OeW3hkHUWkMIE2Fa+r/jKEQfgFXQF5RJtEWVJyigrkhZ6AjCgY9TcIdA1UVY9pVQmHQ8eonBSlfogxoMBtTqJerV2k445fitdW6bg7zTpDEzwavf+iwPf/5Z5o5OIHODi5db/Iv3TPPpRxcouQaYLvEgoNUNEIOBJ9UFKUBvAPUm1Po5KZGGxWBzHsO0NFh1SFEwIJMmFKpkuRwCzPKhy0nluj4LHQgHgytATdvFNGwQBiKPmXT6eKnFQltgkOP7PrVajUq5oL9DGCazJY+tr/4vqrMjrJ95jRcu9igXTDa3I4Rhc+/t4/zJY+eo1G3GakVeeWWdEzfM0Nzq/NOAKqe+kqRMh8Hm5StAleWicIDEJrPLqDhQr03TTINVCatgJSy2BcFVFv1+QP3UZL5tYAqpgVarCqirgXr+gFtGNzj1pUdYWNlWKY8kiUgHPc6vR7zl6CiXVvpMjthcXPSYGnPxYjh/ockdt0wi+v2+VAn3+1nU2InbK/GpLG+5BJuXMW1Hu6cG6nskhktulxUuECpOUu3GKhkVzJilnmDgDSgUCtp11fuFaSOFgZHHTNk9+rHBQs/GEipGParVKtVKEYnkxn0uD//nX6BQt9lopqRI8jSlURW02hGH9o/x2tk1DDNjebnHocNTFGx45VybQ/sKiJ7Xl6b4XtZ9M7g3x62Ky0FzWZ+yumAFdOD7ZBpohTzLyVAWTRVKRJ5TdzOWPQO/718BajkuGMr9d123RycUrPmOLly7QIvqajG4rbrAZ373U5TLVRwRMj5i4/W69L1cW1ti0W71KZZsbEsQpxlxmBAkCaqw/H8DVR6wCzQYDMjNIrlVGrqsHBpWlRzbgIoVa6Bez/u+QC0jY9we0AklKz2wDZNer0etWsNxDIIo48b8Kb7zjVfJ8iatTY/tbpfJRhk/6OFYBVrdrq7Jo2N1vH6XKMp1goyzFKSF6PZ70hIC0zIQDEvM1bc3JyhlUW9zQZOBLE20Rf1BoOPTsEpESbaTjXPyTMVETtUKWembeL0+xWLxiusOLSpwDBi1fbxYsNDJccwh0HK5TLnkEMSSe/eu8LFf+W0wSozWXNIkIEsFY6MOFy+t0usnVGsFnXhGGkUOHahx6pU+mDEFx0S02l3pOJY+ee1qO3F5NUl4A/AdoMrldoEq18mdGqZdJkkSUkUihI2QuU4sNStivW/S7Q+BKqvbrg2Go79PxeS4M6AbSZY7EnsHaKVaYa7uUKzA43/0Sd5z13E++9DDHL/mAPMLLer1UZZXFkmyjEMzVV54dQ3LMgmDgKmpOltrA5ySYLsTITa3tqXrWBTUF19FHP4xoP7mgi4LV4B6PplT0xaVuSTKM1JMhFTOI2k4Cqj1BqCWayN2gBoCxu0+vUiwqlzXNOn3+5TKJY6O2UyPWlx86mE+/+ATHLlmmpdPLeCUHUZrY4RBSxORSsFkrTnQpc0pOAQDRWIyZJ5TKNgqRntS8VbbfqPr/r8CVRYVVglTGKQZ+Gmma6gloOHErPnq4r0di6aYtoUwXZ14ctNi0urSiySrXXAsi37fp1QpcMvBGo2yxRO/+++Z33a5eHmBarFMrVGn3+sThAEV16Td8Umx8OMQEwvDkGTqQpSXygwxCAJpiBTTdDR51mkkFyp5k6HiTOVQrkSvKsx+c15nyySJVcZhu9VCuuNYbhFbEwmDbpCQ5OBaGXU74nLHxOv3dclI0wRTsSJD0UiBKhYHSiGdQDC/nWvvUnW0XCojZMK7jhd46sGP4VtTTO8/QQGJmQa6ueisr+iwywYtWl6fy80ep05fwrAUGRmGYhTFCM/3ZS4Nmotn2Fy6ROgPsEWGa8GBAwcZOXYbmXrDDtQrQFUJSSIys0B9YhZTHdEO91UdSqvbI05SKq5Fo+iASAnDmH6Q48dSlVpdNnR6NiSOSEiSjDBVzYLqfqQ+BPUa5ZbV1tMsLnrUD9+BDAaY3Q0ghc4KwnRIthcJ/JC1vsfi1hLnLnWItFepKMsQfc+TJ7/7FP7asg5k2wGLFNeUNOplDu2fRs7dDapmqpgzHbrrFzShV0BFdZxGfRTlA/qikSSZpN/tMVqvaLdMpYmTdxAJqC8I/B6b/VS3dupwLNUmioQwCMkyZQX1dRmmaeCUqwR9n8PjksuvvsrW+ctMTE5QLtcRsUc26CCyRJOO7d4qp8+vcv7iGsWCRbsfYBqCVs9DbPcD+aVP/S5TeydwRUKtWCROE+0WXhTr5FJTsfKBj2irCtulu3oOS7VoWUw/TPCDBKM0jmEX9AnKPOXo3CQxLnLzPFZvHqO7SD/0cesTIG2C0rWsx0U2kxzLsthTStjsJVxYC3Q/mueCqZkRDsyM4/f6zKx9nc2+wbmTL3Py9CscmTvIHTddh2MKwl6TS6ubPPHsORqjJd56/TGWVudZXWliqtJixIi2F8kv/fEnqdSqXDtusXdymjiOEVlInqcEcUwUBhx437/UGU1YDt2VM9oKSZYQhBndXh+jMoVTqOKaJmXXpNYoEm5eYP3UM7higGXF2DLToSFkwMAeYd9dH+Z8U9JPBbMl5XYJ8+u+TmJSGjhFQaXo0PVT7r++TLvfZ+nJv+G5UyfxewPecv0NHLzuOOunn+TUhTX8OCdPC3SylF63x4lDNdIooZ/EiK1uIL/2uT+kkGccP7KffdPjyGSge0QdPmmiy0jl7vt196KBLr2m3UqxjijM6HS6CA20rmN7slHEtRNOf+2vqZccxmo2dqGAVCQ/HLC+eYqk3WfuB3+J7dxl1ReM2CHrXsLKtlIhMvyOh6LO5ZJBLkxunRljtPsK/+FnPsqHf+dTfOkzH+P68XHu+9cfJXrhszx1+jxLzZSDc8cRrsvaygVa7RbddsK9b5tGdAeR3Hri6zx/5lXuuPVmGrUyduqhWuhUaSIyI0k8qm//SfI8067rLb2G0EATojCn3elilicRhRoFcvbvHyPZuszayy/R2HuIomvgSAUgwEpTeq01Lp59kfqhE5Sv+UGW+xnjbspaL+G1SyukQYiQBnmSUZ6q4rgWnWbIR+4ss72VsfXCt9lYXKAyN8exiVmile+wud2kGRcYhA5Ft6AKjfaksbqDqirCjyIZ/t1XObPV59rrriXz+rTWzpGEfaZHq5qtBH6X4x/6Za3bqPaqoy1qEWeRBqosmpfGsZwa18xWMAplXn3kE4wcuInq2DRW3EGguGeKjGKysM/KyjkuX7zMjT/+X4hFAWTIajvk/FoPM40wDEszHNXoFVyXvSLl6GQGQUqwPa/pX/GGuyi89jeI/msEvkc7gHJ9UucPyypTyX0kHbx4gPDDQIbzizT7m4y5ZUTzHO2tVWQWM7v3KJ3OpmYYk+/7ea3l/ENAZXkCt1Dj6EyRzUsXGDz7F1SvuQejOooTt5EyxRBK5EpIwz6rq5d46eTzvOPDv8qgNI0lQ5ZbAeuegDzWopdy4bA/wHAtZtfXueeHbiRabZL11vFDQfHE3ZSe+mPCcJUsHmhG5g0KjE/P4SCwozbS6GKICLHd6krTsWmeO0OBhJoyubdBFIYwPocTNAk7G5Tf+/P6Ig2rQGf5LLapkpGqjQntTgdZGmfP2Cijo1Xazz9BuHyS4sRBIqPE6vICk40qxXKF9Y1NbdnEb/H6mfPc88GfJZ66DouQhU2P1T4ImRIEgS72vtfDkIKR8+e476P303v9At1zz5PjMn7XfcgnPoFhBeRJQmerxbLnMHf0BsrFKsV4DYSnxTvR7njSdgxWL69hdJaoZD3C5TMIu4DllDCMnLWlRU783K/psmGo8rJyTksbWRpfAVqojnFwzzS4ReLzT7P94rcpj+2lNLWXaODp+M2TPltbbSwjp7OxyOrqGte9+37M2ZvJ0j4L2zFL3ZQs9LHMoSbld9o6RJzXTvMTv3g/rVOnab34XfxijWvf/9PIb/8+WdTENlVSjDm/HiAKoxy/9jhi0KRo9bFcE9Hc7spi0WLl4jz+yhlcf51i5GG5ZZxChd7aBfb/9H/FMJVolb0JaKSB9np9CtVx9s9OI6MuLJxk/pWXKRoZI3M3DTXesgLqkYUZIk945pnvaMay/8g1FN/yY5rqXdj02RgYGGmqE18Yx6QDD5lCNdjkQz/2Hs5+6Us8/o3HuPWOO4ijgO7Aob2xgu9dpmjmlGyLwUDiVCa4/fqD4C9SdpQK6AcyCmM2X3metXMvacF5z3iNEdek1+pgzh5g5p4fQSoSocqNreroBQzTJE8C/DCl3W4zPrmPiYlJhL9B//kv09puQ+hR23MtSJPMLhIFfe0FadTl+ZdeYWa0wMzsCKN3/wKWJbjUzln1BFkSahVcdR5xEGILGPR7vO+oS2C4/O2jn2Ri303sOXYdrbOvUi0XuDz/Iv7WFpVKhdVml9R02Fhs82P3zuEqoA8/+lV5x2iO65ZYPvscTUWbnDoHqyFRoco1P/QRDEXyTaXhDilgf+2clkHyNKAfJGw228ztO6i7ewKf5rcexPcGeJ0Oe47dQEad0Avx/B6mK1jbvMj66hZTky7jdcG1b/8QSW0PL8x3Ob/Yxi3VcKtl3IJJFESoVmN7fZM799gcuvkoF/7yUQZJyMd+/X/y2w/+ORceepCN0CcdMzDrFb7+1FnuPDDJ4RNHmZZLzHe7iAcffEzeMmUxW4HB1gK9QUKr3SOJOtzzSx9HaBXewhBDndawHPqrCqhNGvsMwpSuH3PgwCGK1RKm16H9wtfpr1/Ga3eoN8aozh0njwS9Xgsv3Oa5p08xNV6k6MTsm6qy544fxhw7zGazxanlgNbAYHJmWlu502ppDSho9zm4t8GxikRJ7q2nHqe2520sPvHXFO96K41aTvfF5wiXN5icqOKXyowevpHXn/8iPT9FfOHhP5cdz+C94xsURUyoxCS/Q5mcyj0/yej+Y1ouGerXVwE1bZKwSxhmxJlk7tC15JYJmwv0Xv17gt4m3fUNHNcBldQqY4TpsAU8/eLf06hZVIsWM+OSPT/wKxhjM1rPbfcGnFzsYzk2lhRcOPMqrmoYw5jRPWO8c/847ojD6W8+Qf3423DnVyj2l/E3FtlqLlDdU6Db95GFUXIDLi1fZuBHiMce/aJMUkG/HXK81GLK2iaPPFwz50K+h71vfw+HjxzTNVQPkJSKvr2k5yqqHiqttlgoU99zZNherZ7Bu/QqvfWL9HsBpVINo2CTGSUS1a4g2Fy6SL+9TKNRYnK8SLVsMH3rD4FVxBtILjcDnj65TN0QpEpqUe/PMo4c2stBs8/8t7/G5A//BPGWRxrERO1VMpXo+uu40tcjjWYvpFw1efnSuu6SxJ9/4VGpmEfXD+h7EXkQU7NiygUbs1JmfLyMZTlcf+JG3feFvk+exyjjpYMumAYje64lzQUibJMuvoK3ssjG8uuaINhuVY8xklyQGkrpd8jjgO2lczhWigprx4GK8Bif2IN58AfoyQbfeObicIAVx7jOcHTxzw7OUIw2+KuHHuDuj/432guLVBoTnPnm49RqBkVX4lixljrnV5fJZMr5lQDDNBB/9vkvqIGKnoLpUUKa6A91TUG17lIpFfXAaLvd5Z13364plsqIQW8LGXcYmTgCdpF48XmdqMLGXhLTwcnVCNHUArbSKKQWGFUPp45XYEuTxMww1etkrol7joGl2JeRK21DKxV6DAJaAFt+9js0DkyST40w/9xzuCubTFemdWOebJ3DyJv4cYetdsBG2+OZ8xvsmdlPr9VFPPzQn0kpxZWhkGUpN0l0j6jUiHLBwXZM4iijVilRKVlMTc9SdEzMXM05G1w+/RR4q0zPzDEYP4Ephp39MLCH2Xp4V+iSoYUZPcoZzmnUi5X1dm9XT/bUfdXkZzLCqJZ0qYkcyROf+QNuv+4G8lZE3Npku7dGv7WMMFI6Xg8/sVnbTvD9iOtmHWXRR6Tyfz2WSxJqtSpSZlqSVIpDwbVwi5aOtygIOTQ3peP18KGDVEtlNubP01w+z9b6JaZn97P31vuQMr6iMqkpV25IxHAo84bEtpvgdpPd7sROqxUq4HfUKiW4mWZGWjDppl2++sRfcX/jesYOHeTLj3yW1BtoPXl7e5OVjQ3GRkbpeiFG4rN/xKZHEfH5z31Bqi9ybFczHKdgUa0M9Vl12pZtoJhTmgq6rTZzh2b0SO/u22/DtFy+8uhDiMEWbsGiUmtw4zt+nCRTQHesmAud/XYefs+6u1bWk7fsSlZXr1MyqYprbXglriuLJj4PLD/L0toWPxEZ3HT7OyARBEnMZy7+Hb8wewOnXzzJ8soKMgoIgoh67rM0/jYO33gM8eADn9PHXSwV8LxQD25GRit6tqKCWmmsjqtcxyDo9UiTGNsucNuNB6nXG3z9r79IUQYIGVOfmuO2d/2wHsRqj9xpzq4eUl0thquDVIecqem4midc5b67GvNQH7Mwk5CPfOVzjNsGv7HnMJXDih9nrG0s8enOOX5/79s501xn69zLOkn6EyfIjtyNkUR0lBj3mU8/IG3bolar0/c8okFIpVrWwxrFNVXmdFw1pZakUUC/6yFsh+uPTbNvaoJvfuVxRN7Vpz524Ah33/t+rTxcicvdONypw1eD3o3Rq4EO3XhYt5VJVfOgelPCLv/q8S9yVzbg377rR0mtopZmvnnuJf7Sb/Lv9l3HaBgR99uc2vtBit2zWOUJts+dxt13AvHpT/2RVJ1CuVIhSTOSMESYgpGRCmE8vOBypagXMJR65/shTqHE9HSdE0f28ldfeAwzD1BC/8yx63nbPT9IojL3bi56E9A3H4DSh4ZAc52o1OPv+blyYwPDBL+1yr/522/yezMN9p54F0Gqws3kN5/+CiebA/73j/8M21GRrbWIgpvR6oWI5gKFQzezvraF+O3//glpWxaTs5OkamDkBcRhwPhEQ7c3Ay9n/3QNu2hzcbnLoLNNoJiGY3HvzVOsXVpkY22VUtll5vAJbrv33WQ6vq/Kqm8APRz776TkK7sOpnJhOVT3850GYmhUVaRMlrYW+M5mi5+7859rUV1aBhVR4AN/+ht8/AO/yMZqSJJBsZrSbQ3rfG7YdLpd5g4dQvz6f/otOTpapDI6ws1vuZFrD8/qzkTFVxp4FLMAMw6Q3ipq6P4n37pM4BSpV4vcdrCKEULzwots+z4jx+/gxO13kiXqgoelY9eCuy67u9uwC1THaZaRyhRTrfLkgiwKMKzhOpDaklDa7NfOPMt7b76PUn3oXcViiukUefrFVVZaXS26jU6M6cRWLRVZXt/SI8e5Y8d56Hd+S7nuH8p6rUFmSH7kvvuGg5ksRYjhRYrVM7jzT5OnPkZxHBH3eHJwmNe3+tx5tMxooU62eYGSI5F7bqJy4Bh5qt47dMNhftnJwDt6/y541XMqMpJlKUka6z5Vu3Em9cxmd+BuGSbPzb/KO976AfI8UTSEzLH4xB8/ya03TOs1A9MqEIYDHLdCHIbYZkpjzx5eeOSzXH/PXYiHPvcFWahUibC4aazIRLKGSLd051DwNpHlA8hsACru/C2SjSWqs8d4Qu6nWnOZqFbpnT/LuOhinXg3pb1HyK4AVZZVafONQHfr5zDrDsGaaigUh3oHKYlCCnqGM7S7Scaljsf1192qvcUgY5DD5x87yQ23H6Sz1MSulnAMkzBLGamXaHkBzWce55Z77qUXxog/+P1PycrYDHl5nCPxIjeUNjCDVSxLjQoEXvV6PZ43/BadS9/FjkMKs29F3ns/plvCcl1kHOCWR4mlIA4UF5Y7iWXoFbusR1/37vx1Z4ShnltZPs9YdQS7XNN9cbi1Sm4qYjocEjlkPLvU5LYTd5CqCTZCD4g//vkXaDQsrtk3ySDoU6oU1WyAXlyiFl6mPNIgjXK91yCe/NqXZX10QicTFxi59DdY0aqWTkR1P8FhFfxKpuwNt8vigOrxt5NlMTL0GajZhzSpTs5hCEl7uzks/jt7Rnq+ojPpEOQw8lS3pujg8BC2Ny5TKZSxqyOYjkvS3NDfPywwULQMfu2BT/KzP/XrVFzFyVXcSi70QnrtnCCK2DtZ1oJeszPg0IjALjuYqZJjfIK+hwh6PcVNdr7cZPDEA5TjRew8IX/vr2JVJ7WFFL82dAmIh3tFUYjf22TswC3D0aJMtHq/vbmpL0S5pAaoH6jPV5THvGJRVZfVYagR4pgd0PYzUsuhXKuT9HraPXdv6gDzrRfIS9ch6zPDSJcJrdDlYithdbWJyB3GJ1yumy6BpbbZAj0sUwyvWKoiXnj2pIxDSGSG2hS5dvPbWME5HFLaxiTtubsZn91DpT6BYbpaoR/uHQ1jaGgtdcoZSRyxfP6sjjU1O7UsNfrTU6fhYpVd1ktYYRgSBKGWKFUNP7p/loWNLexqY/jZg7ZWMhTdVYOsgpGxZ6RIWp4gM9VnqFN3UDLtYy/4jI2UePIr3+VnfvJmPE8Nf3O63gBbabuW2p4JEf3VS1JxSzUXUaszaWsNs3cRmQQ4B2/D3ncNmShqMmfuTgbftH+0WypUPKnRn2oO9AXr+FReoEb8egVKjXD1y22132cVMA2TuLWgJdHS7HEGvRZO66LmRpfnl3TsjU3NUJq9jlKpONwLlOCFkdZ+SxMH+L3PPMn/+OV389K5FU0Ls2igPUKtBsxfmqdUGUUsv/SCNE0VOxLTsnCMTHcOjmq13AJmdRwKNTXI/N7Y+4pTvfGOAqrcPBn0idWKnKGOZ5g3hWrRtBvvcCa966pWXQ02NhYpFkp6Vqre0UibfOqBzzKz7xB79+/T+xJdYwLHkFiWqzshJWxvri+y/+b3c3DSohPnmhKqnadi0dGbpP31CxTLdSIlCiyeflEaalFRUQTlljurqardNWSqx+x2tU6h2sByykMysVsbNZPZIQY7mJUV1eeknVXCblu73zAH6NYeQ9XJK2lGLWxAaphYqrzk6hwMLKHW7roMgoCg1yFNfJI4JFM6bxQQqmWp7jrT7/s4rbXLpI6tV3ZaXY8sVasBJrZtEi29SGPmAINBjJh//ilpGTa5GkebDobeY1CKvNq+dHQxN7JU1zfbkFoSyWWqy48qAJat5BIX23awXAfbLWEaFjIK6bcWEVmuR/TKRQ21siqGC5ZDGjG0sH6o/lLTOuUVyg/Uep1u1lVCU0ZVx6SacJ2z6ZsNBmmd5ban28Z+x2NkrEaYoDfKjhzcx9biC4yOHqSzvYF44D9+WNoypFwpY7pl3FIDt9qg1hinPjZBsVjHaFSHZMy0tNyhvtQMvaECb1nkltopMoaPdzbK1PqqklZkGqPWVJRuo5UExWzU6y2TPFYJy8J2LDDUTtIw0ekDUfK83v3a3Qbf2SlWoNM+weRtnD67RhCl+j1ekJEbOXNTVYrFAqdPv4YVRayttSiVJOLjP3WvrI6PUCvXyfKIJJG0emqpIqbiGkgzoVAoMzvhUp0+RHn2uiFFXD/HSLVAwXGpNhpgqT0jG+lUyUhI1TKjypK6FAytonxTZWcFWlqWpnrque1LryMzE6Pk4JTrWHYBYduYqm6rtVtN8RSDMLDUSk+lgVUa4eun1kjTENcW7J0a0Qc3v7BJZ3ubdrtFwbZpjNYxzALi2eeWJN4mWWcV4a8T9dfAdqmMNYiEQ+AFdLa3aG2uEgU9bn33j2hR+fQTf4mRR6TC0oPbasGkVobaaJnGwfdSHptFqINKQ0rlitaeTKeE49rkcYrIU8yCiyFKdC6/rjsWVYL04o9qtA21nuNgl11SRfqTBCPLiWOfo+98P4+fXiMYSI4dHKFgCp595TKDpUvEzjTVmkGlWCKKBnqFJ5Em4hvfOiVloDqULqW8z0g1Z2rfDO6eazHc2g6hGcaGyna5ITQ1VK1Y5PcI/R797Q26S6/TXzxFZ+1V0sE60ixQmLmH4v4bKTfU1krKM1/7MgtnX9ef0/Ql5ZLLxESVo3OHKRcdvW3tuCXdG5cqNf0DA0UyErOgV4CS3jbXvOeDnLqwhD+ImJqY5OmnTpNGHnZRNeI5VKpYImW0WqDbVT9Y6GNE24hvfvuUdNOAshUwMlJmdGwEuzaixeShMvm9RcjdTe03VxcVU1IOk40qKdpP04zc26S5dE5vYipt5+zzz3H59Iv4vsfGdkY3yhBpwFtuPkwaB9hmQrPlcfZyW5+q2nQdK9v86D2HmSqPI2/5EMW917DSlRSdAs1Oi8X5JgcmbDqdgInDBzHzjG6niVssIjJBEEYYG88iNlfmZdExMAtV3e4MnUflt//7jwl22y0FcKi/qt+EqMxEFBIAAAFVSURBVBF+DlGgt1tUWVDT84E3JPuK4yr50tC9pxoPqh8F5ETeNsH2kt7pvXBJsasuMlVNvs/W6hbRyjq/+bdNzl6Y5+JKyNSeSbzWNpcuNJkcUfsWNu5YA9tyaBQy1jY9jCwkpY732ucQXndT5kKtc79xp/4f2q//x/bu9QGp7l/VV00DQ+3ieRToRWU1ckwjtfeg2FOsWYyqy0r8UkPQXJUgy9WxaMgIU+78FiftU5k5zFpfaHqZ2w1yU3DmzAJrKx4zIxmHb71Fl5ho0Ke1ukyYCmTkM1K32Lr4MqLXb0vFi64Wja9WBf7Jv6DY7TqzBKlW0+KBlj3Vj39UTc3SFNNVPwFR3wVBpzv0Au0MFnESDLsZbPI80v2vYlWqiVFZfvTYbSwvb+laOxgEWNUJvvoX3+Ut9xyl3+6x59Ac2+0W5557hvHZI9gE9FKLyfg0fWM//wf6+CLf/craMgAAAABJRU5ErkJggg==';

        Common.model.promptModel('teacherModelCtrl', teacher_model_template_url, 'md', true, 'common-modal', {
          edit: true,
          item: res,
          croppedDataUrl: res.photo,
          getdata: vm.pipe
        })
      })

    }

    function view(data) {
      User.get(data.id).then(function (res) {

        res.photo = 'data:image/png;base64,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';

        Common.model.promptModel('teacherModelCtrl', teacher_model_template_url, 'md', true, 'common-modal', {
          view: true,
          item: res,
          croppedDataUrl: res.photo
        })
      })
    }

    vm.deleteAll = function () {
      var selectIds = Common.table.selectIds(vm.tableData, 'id');
      if (!selectIds.length) {
        toastr.warning('请选择删除项', '', {timeOut: 2000});
        return;
      }

      _delete(selectIds);

    };

    function deleteItem(data) {
      _delete(data.id);
    }

    function _delete(ids) {
      Common.model.promptModel('deleteModelCtrl', 'app/components/delete-model/delete-model.html', 'sm', true, 'delete-modal', {prompt: '确认删除所选老师信息吗?'})
        .result.then('', function (data) {
        if (data === 'ok') {
          User.delete(ids).then(function (res) {
            toastr.success('删除成功', '', {timeOut: 2000});
          });
          vm.pipe();
        }
      });

    }

  }

  angular.module('app.pages.dashboard.site.teacher').controller('teacherCtrl', teacherCtrl);
})();