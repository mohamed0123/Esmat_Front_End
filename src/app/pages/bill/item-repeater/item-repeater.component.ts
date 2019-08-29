import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesService } from 'src/app/shared/categories.service';
import { HumanResourcesService } from 'src/app/shared/human-resources.service';
import { SalesService } from 'src/app/shared/Sales.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-item-repeater',
  templateUrl: './item-repeater.component.html',
  styleUrls: ['./item-repeater.component.css']
})
export class ItemRepeaterComponent implements OnInit {

  billArray = new Array(5);
  billSummary;
  printableIdx = []
  categeoriesALL = []
  humanResourcesAllType = [];
  humanResourcesInnerList;
  searcedItem;
  hrRow;
  incomingMoneyCurrent   ;
  searchKey;
  // @Output()
  // categeoriesALL = new EventEmitter();
  constructor(private catservice: CategoriesService, private hrservice: HumanResourcesService, private notificationService: NotificationService
    , private salesService: SalesService) { }

  ngOnInit() {
    this.billSummary = { totalNumberofkillos: 0, totalPrice: 0, cicarhCount: 0 }
    this.catservice.getAllCategories().subscribe(
      data => {
        this.categeoriesALL = data
        // console.table(this.categeoriesALL)
      }
    )

    this.hrservice.getAllHumanResourcesTyped('العميل').subscribe(
      data => {
        this.humanResourcesAllType = data
        console.table(this.humanResourcesAllType)
        this.searcedItem = data[0].name
        this.hrRow = data[0]
      }
    )

  }

  setResChangedOut(val, idx) {

    this.billArray[idx] = val
    // console.table(this.billArray)
    let totalNumberofkillos = 0;
    let totalPrice = 0;
    let cicarhCount = 0;
    let rightIdxCounter = -1
    // debugger;
    this.printableIdx = []
    this.billArray.forEach(row => {
      rightIdxCounter += 1
      if (row.name.length > 0)
        if (!isNaN(row.price))
          if (row.price > 0) {
            let sumNumberofkillosPerCoulmn = 0;
            row.items.forEach(item => {
              if (!isNaN(item['numberofkillos'])) {
                sumNumberofkillosPerCoulmn += item['numberofkillos']
                cicarhCount += 1
                this.printableIdx.push(rightIdxCounter)
              }
            })
            totalPrice += (sumNumberofkillosPerCoulmn * row.price)
            totalNumberofkillos += sumNumberofkillosPerCoulmn
          }

    })
    // console.log(totalNumberofkillos)
    // console.log(totalPrice)
    // console.log(cicarhCount)
    // console.log(`numberofkillos : ${totalNumberofkillos}`)
    this.billSummary = { totalNumberofkillos: totalNumberofkillos, totalPrice: totalPrice, cicarhCount: cicarhCount }

    this.printableIdx = this.printableIdx.filter(this.onlyUnique);
    // console.log(this.printableIdx)

  }


  getMaxItemsLength() {
    let maxLen = 0;
    for (let index = 0; index < this.printableIdx.length; index++) {
      const idxData = this.printableIdx[index];
      if (this.billArray[idxData]['items'].length > maxLen) {
        maxLen = this.billArray[idxData]['items'].length
      }

    }
    return maxLen
  }

  getTableResultsOld() {

    let tblRes = []
    let tblTemp = '';
    let tempRows = '';
    let maxLen = this.getMaxItemsLength()


    for (let index = 0; index < this.printableIdx.length; index++) {
      const idxData = this.printableIdx[index];
      tblTemp = `<table class="grid-item"><tr><th>${this.billArray[idxData]['name']}</th></tr>`
      tempRows = ''
      this.billArray[idxData]['items'].forEach(element => {
        tempRows += `<tr><td>${element.numberofkillos}</td></tr>`
      });

      if (this.billArray[idxData]['items'].length < maxLen) {

        for (let index = 0; index <= maxLen - this.billArray[idxData]['items'].length; index++) {
          tempRows += `<tr><td></td></tr>`
        }
      }

      tblTemp += `${tempRows}</table>`
      tblRes.push(tblTemp)
    }

    return tblRes
  }


  getTableResults() {

    let tblRes
    let maxLen = this.getMaxItemsLength()
    let itemsLen;
    let newArray = new Array(maxLen)
    newArray = newArray.fill(' ')
    for (let index = 0; index < this.printableIdx.length; index++) {
      const idxData = this.printableIdx[index];

      itemsLen = this.billArray[idxData]['items'].length
      newArray[0] += ` <th>${this.billArray[idxData]['name']}</th> `

      for (let index = 0; index < maxLen; index++) {
        if (index < itemsLen) {
          const element = this.billArray[idxData]['items'][index];
          newArray[index + 1] += ` <td>${element.numberofkillos}</td> `
        } else {
          newArray[index + 1] += ` <td></td> `
        }
      }
    }

    //  console.log(newArray)
    tblRes = `<table> <tbody>  <tr> ${newArray.join('</tr> <tr>')} </tr>  </tbody> </table>`
    tblRes = tblRes.replace(/undefined/g, '');
    return tblRes
  }


  getStyles() {



    return `<head>
  <style>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  .grid-container {
    display: grid;
    grid-template-columns: auto;
     
    padding: 10px;
  }
  .grid-item {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.8);
    padding: 20px;
    font-size: 30px;
    text-align: center;
  }

  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: #dddddd;
  }
  .container{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}@media (min-width:576px){.container{max-width:540px}}@media (min-width:768px){.container{max-width:720px}}@media (min-width:992px){.container{max-width:960px}}@media (min-width:1200px){.container{max-width:1140px}}.container-fluid{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}.row{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-15px;margin-left:-15px}
  .text-right{text-align:right!important}.text-center{text-align:center!important}@media (min-width:576px){.text-sm-left{text-align:left!important}.text-sm-right{text-align:right!important}
  </style>
  </head> `

  }
  getSummary() {
    return `<div class="container" style="direction: rtl">
  <div class="row">
      <div class="col-8"></div>
       <table>

 <tbody>
     <tr>
         <td class="text-right">الكميه </td>
         <td class="text-right">${this.billSummary.totalNumberofkillos} </td>

     </tr>
     <tr>
         <td class="text-right">الاجمالى</td>
         <td class="text-right">${this.billSummary.totalPrice} </td>

     </tr>

     <tr>
         <td class="text-right">عدد الشكاير</td>
         <td class="text-right">${this.billSummary.cicarhCount} </td>

     </tr>

 </tbody>
</table></div></div>`
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  printDiv(divName) {

    let res = this.getTableResults()

    var html = "<!DOCTYPE html><html>";

    html += this.getStyles()

    html += ` <h1 class="text-right" >فاتوره حسابات لشركه عاطف قنديل ل صنيع خيوط الشانيليا
    </h1> 
     <hr>  <br/> `

    html += this.getSummary()

    html += ' <br/> '
    // html += `<div class="grid-container">`
    html += res
    //  html += `</div>`
    //  html += document.getElementById(divName).innerHTML;

    html += "</html>";


    // console.log(html)
    // var printWin = window.open('', '', 'left=0,top=0,width=1,height=1,toolbar=0,scrollbars=0,status  =0');

    let printWin = window.open('', '', 'left=0,top=0,width=1,height=1,toolbar=0,scrollbars=0,status  =0');
    printWin.document.write(html);
    printWin.document.close();
    printWin.focus();
    printWin.print();
    printWin.close();
  }


  save() {
    let price;
    let category;
    let categoryObj;
    let noOfKilllos;

    for (let index = 0; index < this.printableIdx.length; index++) {

      const idxData = this.printableIdx[index];

      price = this.billArray[idxData]['price']
      category = this.billArray[idxData]['name']

      noOfKilllos = 0;
      this.billArray[idxData]['items'].forEach(item => {
        noOfKilllos += item.numberofkillos;
      });

      // console.table( price , category , noOfKilllos )
      categoryObj = this.filterExactCat(this.categeoriesALL, category)[0]

      let value = {
        id: NaN,
        quantityInKillo: noOfKilllos,
        priceInKillo: price,
        humanResources: this.hrRow,
        category: categoryObj,
        incomingMoney: this.incomingMoneyCurrent,

      }


      this.salesService.insertNewSalesWithOutForm(value).subscribe(
        mdata => {


          this.notificationService.success('تمت العمليه بنجاح');

        },
        error => {
          console.log(error)
          this.notificationService.warn(error.message);
        }

      );

    }
  }

  filterExactCat(catList, val) {
    return catList.filter((cat) => {
      return cat.category == val
    })
  }

  doFilter(fetVal) {
    console.log(fetVal)
    this.humanResourcesInnerList = this.humanResourcesAllType.filter((humanResource) => {
      return humanResource.name.includes(fetVal)
    })
  }

  filterExactHr(hrList, val) {
    return hrList.filter((hr) => {
      return hr.name == val
    })
  }
  _setSearcedItem(item) {
    this.searcedItem = item
    console.log(this.searcedItem)
    this.hrRow = this.filterExactHr(this.humanResourcesAllType, item)[0]
    this.billSummary = { totalNumberofkillos: 0, totalPrice: 0, cicarhCount: 0 }

    // this.addElement()
  }

  addElement() {
    // Adds an element to the document
    const p = document.getElementById('parent');
    p.parentNode.removeChild(p);
    const oldhTML = p.innerHTML
    const newElement = document.createElement('div');
    newElement.setAttribute('id', 'parent');
    newElement.innerHTML = oldhTML;

    p.appendChild(newElement);
  }
}
