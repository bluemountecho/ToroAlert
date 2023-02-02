using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Threading.Tasks;
using ToroAdmin.Models;
using static ToroAdmin.ToroMarketPlace;

namespace ToroAdmin
{
    class Program
    {
       
        private static IConfiguration _iconfiguration;
        static void Main(string[] args)
        {
            GetAppSettingsFile();
            bool showMenu = true;
            while (showMenu)
            {
                showMenu = MainMenu();
            }          
        }

        private static bool MainMenu()
        {
            Console.Clear();
            Console.WriteLine("Choose an option:");
            Console.WriteLine("1) Pull New Algorithms For BackTest");
            Console.WriteLine("2) Push BackTestData");
            Console.WriteLine("3) Push New Alerts");
            Console.WriteLine("4) Add Or Update Stock Symbol/Company");
            Console.WriteLine("5) Add Mutual Fund");            
            Console.WriteLine("6) Update Mutual Fund");
            Console.WriteLine("7) Update Mutual Fund Returns");
            Console.WriteLine("8) Update Mutual Fund Algorithms Matched");
            Console.WriteLine("9) Update Mutual Fund Sector Weightings");


            Console.Write("\r\nSelect an option: ");

            switch (Console.ReadLine())
            {
                case "1":
                    runPullAlgo().GetAwaiter().GetResult();
                    return true;
                case "2":
                    runPushBacktest().GetAwaiter().GetResult();
                    return true;
                case "3":
                    runPushAlerts().GetAwaiter().GetResult();
                    return true;
                case "4":
                    runPushStock().GetAwaiter().GetResult();
                    return true;
                case "5":
                    runAddNewMF().GetAwaiter().GetResult();
                    return true;
                case "6":
                    runUpdateMF().GetAwaiter().GetResult();
                    return true;
                case "7":
                    runUpdateReturns().GetAwaiter().GetResult();
                    return true;
                case "8":
                    runUpdateMFAlgorithms().GetAwaiter().GetResult();
                    return true;
                case "9":
                    runUpdateMFSectors().GetAwaiter().GetResult();
                    return true;
                default:
                    return true;
            }
        }
        public static async Task runPullAlgo()
        {
            try {
                ToroMarketPlace toroMarketPlace = new ToroMarketPlace();                
                string response = await toroMarketPlace.PullBacktestAlgo("string");
                var toroAdminDAL = new ToroAdminDal(_iconfiguration);
                toroAdminDAL.insertBackTestAlgorithms(response);
                Console.WriteLine("NEW ALGORITHMS FOR BACKTEST ADDED");
                await Task.Delay(2000);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                await Task.Delay(2000);
            }
        }
        public static async Task runPushBacktest()
        {
            try
            {
                ToroMarketPlace toroMarketPlace = new ToroMarketPlace();
                var toroAdminDAL = new ToroAdminDal(_iconfiguration);
                string backtestdata = toroAdminDAL.ReturnBackTestData();
                BackTestObject backTestObject = JsonConvert.DeserializeObject<BackTestObject>(backtestdata);
                string json1 = JsonConvert.SerializeObject(backTestObject);
                string response = await toroMarketPlace.PushBackTest("string", backTestObject);
                Console.WriteLine(response);
                await Task.Delay(2000);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                await Task.Delay(2000);
            }
        }
        public static async Task runPushStock()
        {
            try
            {
                bool status;
                ToroMarketPlace toroMarketPlace = new ToroMarketPlace();
                var toroAdminDAL = new ToroAdminDal(_iconfiguration);
                Console.Clear();
                Console.WriteLine("Insert Stock Ticker");
                string Ticker = Console.ReadLine();
                string response = await toroMarketPlace.CheckStock(Ticker);
                if (response == null)
                {
                    status = true;
                }
                else if (response == "An Error Occured")
                {
                    status = false;
                    Console.WriteLine("An Error Occured");
                }
                else {

                    Console.WriteLine("Stock Already Exists If You Want To Update Stock Details Press y/n");
                    string input = Console.ReadLine();
                    while (input != "Y" && input != "N" && input != "y" && input != "n")
                    {
                        Console.WriteLine("Please enter only y/n");
                        input = Console.ReadLine();
                    }
                    if (input == "y" || input == "Y")
                    {

                        status = true;
                    }
                    else 
                    {
                        status = false;
                    }

                }
                if (status == true)
                { 
                    Console.WriteLine("Insert fullName");
                    string name = Console.ReadLine();
                    Console.WriteLine("Insert description");
                    string info = Console.ReadLine();
                    Console.WriteLine("Insert Sector");
                    string sectorinfo = Console.ReadLine();
                    StockFields fullName = new StockFields();
                    fullName.data = name;
                    fullName.operation = "update";
                    StockFields description = new StockFields();
                    description.data = info;
                    description.operation = "update";
                    StockFields sector = new StockFields();
                    sector.data = sectorinfo;
                    sector.operation = "update";
                    StockObject stock = new StockObject();
                    stock.stockTicker = Ticker.ToUpper();
                    stock.fullName = fullName;
                    stock.description = description;
                    stock.sector= sector;
                    string response3 = await toroMarketPlace.PushStock("string", stock);
                    Console.WriteLine(response3);
                    await Task.Delay(2000);
                }
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                await Task.Delay(2000);
            }
        }
        public static async Task runAddNewMF()
        {
            try
            {
                ToroMarketPlace toroMarketPlace = new ToroMarketPlace();
                var toroAdminDAL = new ToroAdminDal(_iconfiguration);
                MutualFundObject mutualFund = new MutualFundObject();
                MutualFundFields mutualFundFields = new MutualFundFields();
                Console.Clear();
                Console.WriteLine("Insert Mutual Fund Ticker");
                string Ticker = Console.ReadLine();
                string mutualfundstring = await toroMarketPlace.CheckMF(Ticker);
                if (mutualfundstring == null)
                {

                    Console.WriteLine("Insert Description");
                    string name = Console.ReadLine();
                    mutualFund.mutualFundTicker = Ticker.ToUpper();
                    mutualFundFields.data = name;
                    mutualFundFields.operation = "update";
                    mutualFund.name = mutualFundFields;
                    Console.WriteLine("Do you want to add returns please enter y/n");
                    string input = Console.ReadLine();
                    while (input != "Y" && input != "N" && input != "y" && input != "n")
                    {
                        Console.WriteLine("Please enter only y/n");
                        input = Console.ReadLine();
                    }
                    if (input == "y" || input == "Y")
                    {
                        MutualFundReturnsFields mutualFundReturnsFields = new MutualFundReturnsFields();
                        List<ReturnsData> returns = new List<ReturnsData>();
                        ReturnsData returnData = new ReturnsData();
                        bool addmore = true;
                        while (addmore == true)
                        {
                            Console.WriteLine("Insert Returns Period");
                            string period = Console.ReadLine();
                            Console.WriteLine("Insert Values");
                            string Values = Console.ReadLine();
                            returnData.period = period;
                            returnData.value = Values;
                            returns.Add(returnData);
                            Console.WriteLine("Do You Want To Add More Returns please enter y/n");
                            string input1 = Console.ReadLine();
                            while (input1 != "Y" && input1 != "N" && input1 != "y" && input1 != "n")
                            {
                                Console.WriteLine("Please enter only y/n");
                                input1 = Console.ReadLine();
                            }
                            if (input1 == "N" || input1 == "n")
                            {
                                addmore = false;
                            }
                        }
                        mutualFundReturnsFields.data = returns;
                        mutualFundReturnsFields.operation = "update";
                        mutualFund.returns = mutualFundReturnsFields;
                    }
                    Console.WriteLine("Do you want to add Algorthms Matched please enter y/n");
                    string input2 = Console.ReadLine();
                    while (input2 != "Y" && input2 != "N" && input2 != "y" && input2 != "n")
                    {
                        Console.WriteLine("Please enter only y/n");
                        input2 = Console.ReadLine();
                    }
                    if (input2 == "y" || input2 == "Y")
                    {
                        MutualFundArrayFields mutualFundArrayFields = new MutualFundArrayFields();
                        List<string> data = new List<string>();
                        bool addmore = true;
                        while (addmore == true)
                        {
                            Console.WriteLine("Insert id");
                            data.Add(Console.ReadLine().ToString());
                            Console.WriteLine("Do You Want To Add More Algorthms please enter y/n");
                            string input3 = Console.ReadLine();
                            while (input3 != "Y" && input3 != "N" && input3 != "y" && input3 != "n")
                            {
                                Console.WriteLine("Please enter only y/n");
                                input3 = Console.ReadLine();
                            }
                            if (input3 == "N" || input3 == "n")
                            {
                                addmore = false;
                            }


                        }

                        mutualFundArrayFields.data = data;
                        mutualFundArrayFields.operation = "update";
                        mutualFund.algorithmsMatched = mutualFundArrayFields;
                    }
                    Console.WriteLine("Do you want to add Sector Waightings please enter y/n");
                    string input4 = Console.ReadLine();
                    while (input4 != "Y" && input4 != "N" && input4 != "y" && input4 != "n")
                    {
                        Console.WriteLine("Please enter only y/n");
                        input4 = Console.ReadLine();
                    }
                    if (input4 == "y" || input4 == "Y")
                    {
                        MutualFundSectorsFields mutualFundSectorsFields = new MutualFundSectorsFields();
                        List<SectorsData> sectors = new List<SectorsData>();
                        SectorsData sectorData = new SectorsData();
                        bool addmore = true;
                        while (addmore == true)
                        {
                            Console.WriteLine("Insert Sector Name");
                            string period = Console.ReadLine();
                            Console.WriteLine("Insert Share Percentage");
                            string Values = Console.ReadLine();
                            sectorData.sectorName = period;
                            sectorData.sharePercentage =double.Parse(Values);
                            sectors.Add(sectorData);
                            Console.WriteLine("Do You Want To Add More Returns please enter y/n");
                            string input5 = Console.ReadLine();
                            while (input5 != "Y" && input5 != "N" && input5 != "y" && input5 != "n")
                            {
                                Console.WriteLine("Please enter only y/n");
                                input5 = Console.ReadLine();
                            }
                            if (input5 == "N" || input5 == "n")
                            {
                                addmore = false;
                            }
                        }
                        mutualFundSectorsFields.data = sectors;
                        mutualFundSectorsFields.operation = "update";
                        mutualFund.sectorWeightings = mutualFundSectorsFields;
                    }
                    string response = await toroMarketPlace.PushMutualFund("string", mutualFund);
                    Console.WriteLine(response);
                    await Task.Delay(2000);
                }
                else {
                    Console.WriteLine("This Mutual Fund Ticker Already Exists");
                    await Task.Delay(2000);

                }
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                await Task.Delay(2000);
            }
        }
        public static async Task runUpdateMFAlgorithms()
        {
            try
            {
                ToroMarketPlace toroMarketPlace = new ToroMarketPlace();
                var toroAdminDAL = new ToroAdminDal(_iconfiguration);
                MutualFundObject mutualFund = new MutualFundObject();
                MutualFundFields mutualFundFields = new MutualFundFields();
                Console.Clear();
                Console.WriteLine("Insert Stock Ticker");
                string Ticker = Console.ReadLine();
                string mutualfundstring = await toroMarketPlace.CheckMF(Ticker);
                if (mutualfundstring != null && mutualfundstring != "An Error Occured")
                {
                    mutualFund.mutualFundTicker = Ticker.ToUpper();
                    MutualFundArrayFields mutualFundArrayFields = new MutualFundArrayFields();
                    List<string> data = new List<string>();
                    bool addmore = true;
                    while (addmore == true)
                    {
                        Console.WriteLine("Insert id");
                        data.Add(Console.ReadLine().ToString());
                        Console.WriteLine("Do You Want To Add More Algorthms please enter y/n");
                        string input3 = Console.ReadLine();
                        while (input3 != "Y" && input3 != "N" && input3 != "y" && input3 != "n")
                        {
                            Console.WriteLine("Please enter only y/n");
                            input3 = Console.ReadLine();
                        }
                        if (input3 == "N" || input3 == "n")
                        {
                            addmore = false;
                        }


                    }
                    Console.WriteLine("Press Y If You Want to ADD a new Algorithm to Previous Algorthms Matched Data And N If You Want The Previous Data To Be Replaced By The New Data ");
                    string input2 = Console.ReadLine();
                    while (input2 != "Y" && input2 != "N" && input2 != "y" && input2 != "n")
                    {
                        Console.WriteLine("Please enter only y/n");
                        input2 = Console.ReadLine();
                    }
                    if (input2 == "N" || input2 == "n")
                    {
                        mutualFundArrayFields.operation = "update";
                    }
                    else
                    {
                        mutualFundArrayFields.operation = "add";
                    }
                    mutualFundArrayFields.data = data;                    
                    mutualFund.algorithmsMatched = mutualFundArrayFields;
                    string response = await toroMarketPlace.PushMutualFund("string", mutualFund);
                    Console.WriteLine(response);
                    await Task.Delay(2000);
                }
                else if (mutualfundstring == null)
                {
                    Console.WriteLine("Mutual Fund Ticker Does Not Exist Please Add New Ticker");
                    await Task.Delay(2000);
                }
                else {

                    Console.WriteLine("An Error Occured");
                    await Task.Delay(2000);
                }
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                await Task.Delay(2000);
            }
        }
        public static async Task runUpdateReturns()
        {
            try
            {
                ToroMarketPlace toroMarketPlace = new ToroMarketPlace();
                var toroAdminDAL = new ToroAdminDal(_iconfiguration);
                MutualFundObject mutualFund = new MutualFundObject();
                MutualFundFields mutualFundFields = new MutualFundFields();
                Console.Clear();
                Console.WriteLine("Insert Stock Ticker");
                string Ticker = Console.ReadLine();
                string mutualfundstring = await toroMarketPlace.CheckMF(Ticker);
                if (mutualfundstring != null && mutualfundstring != "An Error Occured")
                {
                    mutualFund.mutualFundTicker = Ticker.ToUpper();
                    MutualFundReturnsFields mutualFundReturnsFields = new MutualFundReturnsFields();
                    List<ReturnsData> returns = new List<ReturnsData>();
                    ReturnsData returnData = new ReturnsData();
                    bool addmore = true;
                    while (addmore == true)
                    {
                        Console.WriteLine("Insert Returns Period");
                        string period = Console.ReadLine();
                        Console.WriteLine("Insert Values");
                        string Values = Console.ReadLine();
                        returnData.period = period;
                        returnData.value = Values;
                        returns.Add(returnData);
                        Console.WriteLine("Do You Want To Add More Returns please enter y/n");
                        string input1 = Console.ReadLine();
                        while (input1 != "Y" && input1 != "N" && input1 != "y" && input1 != "n")
                        {
                            Console.WriteLine("Please enter only y/n");
                            input1 = Console.ReadLine();
                        }
                        if (input1 == "N" || input1 == "n")
                        {
                            addmore = false;
                        }
                    }
                    Console.WriteLine("Press Y If You Want to ADD a new return to Previous Returns Data And N If You Want The Previous Data To Be Replaced By The New Data ");
                    string input2 = Console.ReadLine();
                    while (input2 != "Y" && input2 != "N" && input2 != "y" && input2 != "n")
                    {
                        Console.WriteLine("Please enter only y/n");
                        input2 = Console.ReadLine();
                    }
                    if (input2 == "N" || input2 == "n")
                    {
                        mutualFundReturnsFields.operation = "update";
                    }
                    else {
                        mutualFundReturnsFields.operation = "add";
                    }
                    mutualFundReturnsFields.data = returns;
                    mutualFund.returns = mutualFundReturnsFields;
                    string response = await toroMarketPlace.PushMutualFund("string", mutualFund);
                    Console.WriteLine(response);
                    await Task.Delay(2000);
                }
                else if (mutualfundstring == null)
                {
                    Console.WriteLine("Mutual Fund Ticker Does Not Exist Please Add New Ticker");
                    await Task.Delay(2000);
                }
                else
                {

                    Console.WriteLine("An Error Occured");
                    await Task.Delay(2000);
                }
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                await Task.Delay(2000);
            }
        }
        public static async Task runUpdateMFSectors()
        {
            try
            {
                ToroMarketPlace toroMarketPlace = new ToroMarketPlace();
                var toroAdminDAL = new ToroAdminDal(_iconfiguration);
                MutualFundObject mutualFund = new MutualFundObject();
                MutualFundFields mutualFundFields = new MutualFundFields();
                Console.Clear();
                Console.WriteLine("Insert Stock Ticker");
                string Ticker = Console.ReadLine();
                string mutualfundstring = await toroMarketPlace.CheckMF(Ticker);
                if (mutualfundstring != null && mutualfundstring != "An Error Occured")
                {
                    mutualFund.mutualFundTicker = Ticker.ToUpper();
                    MutualFundSectorsFields mutualFundSectorsFields = new MutualFundSectorsFields();
                    List<SectorsData> sectors = new List<SectorsData>();
                    SectorsData sectorData = new SectorsData();
                    bool addmore = true;
                    while (addmore == true)
                    {
                        Console.WriteLine("Insert Sector Name");
                        string period = Console.ReadLine();
                        Console.WriteLine("Insert Share Percentage");
                        string Values = Console.ReadLine();
                        sectorData.sectorName = period;
                        sectorData.sharePercentage = double.Parse(Values);
                        sectors.Add(sectorData);
                        Console.WriteLine("Do You Want To Add More Sectors Weightings please enter y/n");
                        string input5 = Console.ReadLine();
                        while (input5 != "Y" && input5 != "N" && input5 != "y" && input5 != "n")
                        {
                            Console.WriteLine("Please enter only y/n");
                            input5 = Console.ReadLine();
                        }
                        if (input5 == "N" || input5 == "n")
                        {
                            addmore = false;
                        }
                    }
                    Console.WriteLine("Press Y If You Want to ADD a new Sectors Weighting to Previous Sector Data And N If You Want The Previous Data To Be Replaced By The New Data ");
                    string input2 = Console.ReadLine();
                    while (input2 != "Y" && input2 != "N" && input2 != "y" && input2 != "n")
                    {
                        Console.WriteLine("Please enter only y/n");
                        input2 = Console.ReadLine();
                    }
                    if (input2 == "N" || input2 == "n")
                    {
                        mutualFundSectorsFields.operation = "update";
                    }
                    else
                    {
                        mutualFundSectorsFields.operation = "add";
                    }
                    mutualFundSectorsFields.data = sectors;
                    mutualFund.sectorWeightings = mutualFundSectorsFields;
                    string response = await toroMarketPlace.PushMutualFund("string", mutualFund);
                    Console.WriteLine(response);
                    await Task.Delay(2000);
                }
                else if (mutualfundstring == null)
                {
                    Console.WriteLine("Mutual Fund Ticker Does Not Exist Please Add New Ticker");
                    await Task.Delay(2000);
                }
                else
                {

                    Console.WriteLine("An Error Occured");
                    await Task.Delay(2000);
                }
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                await Task.Delay(2000);
            }
        }
        public static async Task runUpdateMF()
        {
            try
            {
                ToroMarketPlace toroMarketPlace = new ToroMarketPlace();
                var toroAdminDAL = new ToroAdminDal(_iconfiguration);
                MutualFundObject mutualFund = new MutualFundObject();
                MutualFundFields mutualFundFields = new MutualFundFields();
                Console.Clear();
                Console.WriteLine("Insert Stock Ticker");
                string Ticker = Console.ReadLine();
                string mutualfundstring = await toroMarketPlace.CheckMF(Ticker);
                if (mutualfundstring != null && mutualfundstring != "An Error Occured")
                {
                    Console.WriteLine("Insert name");
                    string name = Console.ReadLine();
                    mutualFund.mutualFundTicker = Ticker.ToUpper();
                    mutualFundFields.data = name;
                    mutualFundFields.operation = "update";
                    mutualFund.name = mutualFundFields;
                    string response = await toroMarketPlace.PushMutualFund("string", mutualFund);
                    Console.WriteLine(response);
                    await Task.Delay(2000);
                }
                else if (mutualfundstring == null)
                {
                    Console.WriteLine("Mutual Fund Ticker Does Not Exist Please Add New Ticker");
                    await Task.Delay(2000);
                }
                else
                {

                    Console.WriteLine("An Error Occured");
                    await Task.Delay(2000);
                }
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                await Task.Delay(2000);
            }
        }
        public static async Task runPushAlerts()
        {
            try
            {
                ToroMarketPlace toroMarketPlace = new ToroMarketPlace();
                var toroAdminDAL = new ToroAdminDal(_iconfiguration);
                string alertsjson = toroAdminDAL.ReturnPriceAlert();
                Alerts alerts = JsonConvert.DeserializeObject<Alerts>(alertsjson);
                string response = await toroMarketPlace.PushAlerts("string", alerts);
                Console.WriteLine(response);
                await Task.Delay(2000);
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
            }
        }
        public static BackTestObject ReturnBackTestObj()
        {
            BackTestObject backTestObject = new BackTestObject();
            Report report = new Report();
            Returns returns = new Returns();
            Summary summary1 = new Summary();
            Summary summary2 = new Summary();
            List<Summary> summaries = new List<Summary>();
            TradingHistory tradingHistory1 = new TradingHistory();
            TradingHistory tradingHistory2 = new TradingHistory();
            List<TradingHistory> tradingHistories = new List<TradingHistory>();
            backTestObject.backtestObjectId = "6256fa3bea6b9baa2dacc2ac";
            backTestObject.status = "approved";
            summary1.key = "ROI ($)";
            summary1.value = "3022.2";
            summary2.key = "ROI %";
            summary2.value = "39%";
            summaries.Add(summary1);
            summaries.Add(summary2);
            tradingHistory1.ticker = "EA";
            tradingHistory1.buyDate = "07/04/2022";
            tradingHistory1.buyPrice = 123;
            tradingHistory1.sellDate = "07/04/2022";
            tradingHistory1.sellPrice = 246;
            tradingHistory1.gains = 100;
            tradingHistory1.amountInvested = 123;
            tradingHistory2.ticker = "EA";
            tradingHistory2.buyDate = "08/04/2022";
            tradingHistory2.buyPrice = 123;
            tradingHistory2.sellDate = "08/04/2022";
            tradingHistory2.sellPrice = 246;
            tradingHistory2.gains = 100;
            tradingHistory2.amountInvested = 123;
            tradingHistories.Add(tradingHistory1);
            tradingHistories.Add(tradingHistory2);
            returns.days_30 = 3;
            returns.days_90 = 29;
            returns.year_1 = 33;
            returns.year_3 = 49;
            returns.year_5 = 70;
            report.returns = returns;
            report.summary = summaries;
            report.tradingHistory = tradingHistories;
            backTestObject.report = report;
            return backTestObject;

        }
        static void GetAppSettingsFile()
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("AppSettings.json", optional: false, reloadOnChange: true); 
            _iconfiguration = builder.Build();
        }
    }
}
