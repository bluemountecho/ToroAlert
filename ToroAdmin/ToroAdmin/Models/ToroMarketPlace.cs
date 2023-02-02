using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using ToroAdmin.Utilities;

namespace ToroAdmin
{
    class ToroMarketPlace
    {


        public class MutualFundObject
        {
            public string mutualFundTicker { get; set; }
            public MutualFundFields name { get; set; }
            public MutualFundReturnsFields returns { get; set; }
            public MutualFundArrayFields algorithmsMatched { get; set; }
            public MutualFundSectorsFields sectorWeightings { get; set; }

        }

        public class MutualFundFields
        {
            public string operation { get; set; }
            public string data { get; set; }
        }
        public class MutualFundArrayFields
        {
            public string operation { get; set; }
            public List<string> data { get; set; }
        }
        public class MutualFundReturnsFields
        {
            public string operation { get; set; }
            public List<ReturnsData> data { get; set; }
        }

        public class MutualFundSectorsFields
        {
            public string operation { get; set; }
            public List<SectorsData> data { get; set; }
        }

        public class SectorsData
        {
            public string sectorName { get; set; }
            public double sharePercentage { get; set; }
        }

        public class ReturnsData
        {
            public string period { get; set; }
            public string value { get; set; }
        }

        public class StockObject
        {
            public string stockTicker { get; set; }
            public StockFields fullName { get; set; }
            public StockFields description { get; set; }
            public StockFields sector { get; set; }

        }
        public class StockFields
        {
            public string data { get; set; }
            public string operation { get; set; }

        }

        public class BackTestObject
        {
            public string backtestObjectId { get; set; }
            public string status { get; set; }
            public Report report { get; set; }

        }

        public class Report
        {
            public Returns returns { get; set; }
            public List<Summary> summary { get; set; }
            public List<TradingHistory> tradingHistory { get; set; }

        }

        public class Returns
        {
            public double days_30 { get; set; }
            public double days_90 { get; set; }
            public double year_1 { get; set; }
            public double year_3 { get; set; }
            public double year_5 { get; set; }

        }

        public class Summary
        {
            public string key { get; set; }
            public string value { get; set; }
         
        }

        public class TradingHistory
        {
            public string ticker { get; set; }
            public string buyDate { get; set; }
            public int buyPrice { get; set; }
            public string sellDate { get; set; }
            public int sellPrice { get; set; }
            public int gains { get; set; }
            public int amountInvested { get; set; }
        }

        public class BackTestAlgorithms
        { 
            public List<AlgorithmsForBackTest> backtestData { get; set; }
        }

        public class AlgorithmsForBackTest
        {

            public string _id { get; set; }
            public string algorithm { get; set; }
            public int algorithmVersion { get; set; }
            public string status { get; set; }
            public AlgorithmData algorithmData{ get; set; }
            public string backtestObjectId { get; set; }
            public string id{ get; set; }
            

        }
        public class AlgorithmData
        {

            public string _id { get; set; }
            public string code { get; set; }
            public bool locked { get; set; }
            public int maxCapital { get; set; }
            public int minCapital { get; set; }
            public string status { get; set; }
            public List<StockList> stocks { get; set; }
            public StopLoss stopLoss { get; set; }
            public int version { get; set; }
            public int lastBacktestVersion { get; set; }
        }

        public class StockList
        {
            public string tickerId { get; set; }
            public int assetAllocationPercentage { get; set; }    

            public List<Triggers> triggers { get; set; }

        }
        public class Triggers
        {
            public string triggerType { get; set; }
            public Adosc adsoc { get; set; }
            public Adx adx { get; set; }
            public Atr atr{ get; set; }
            public Bbands bbands{ get; set; }
            public Coppock coppock{ get; set; }
            public Beta beta{ get; set; }
            public Macd macd{ get; set; }
            public Obv  obv{ get; set; }
            public Ppo ppo { get; set; }
            public Rsi rsi{ get; set; }
            public Stddev stddev{ get; set; }
            public Stoch stoch{ get; set; }
            public Vwap vwap{ get; set; }
            public Mfi mfi{ get; set; }
            public Sma sma{ get; set; }
            public Ema ema { get; set; }

        }

        public class Adosc
        {
            public bool? applied { get; set; }
            public int? above { get; set; }
            public int? below { get; set; }

        }
        public class Adx
        {
            public bool? applied { get; set; }
            public int? above { get; set; }
            public int? below { get; set; }

        }
        public class Atr
        {
            public bool? applied { get; set; }
            public bool? below1x { get; set; }
            public bool? below2x { get; set; }
            public bool? below3x { get; set; }
        }
        public class Bbands
        {
            public bool? applied { get; set; }
            public bool? aboveSqueeze { get; set; }
            public bool? belowSqueeze { get; set; }
            public bool? aboveBand { get; set; }
            public bool? belowBand { get; set; }
        }
        public class Coppock
        {
            public bool? applied { get; set; }
            public int? above { get; set; }
            public int? below { get; set; }
        }
        public class Beta
        {
            public bool? applied { get; set; }
            public int? above { get; set; }
            public int? below { get; set; }
        }
        public class Macd
        {
            public bool? applied { get; set; }
            public bool? signalIntersection { get; set; }
            public int? above { get; set; }
            public int? below { get; set; }
            public bool? uptrend { get; set; }
            public bool? downtrend { get; set; }
        }
        public class Obv
        {
            public bool? applied { get; set; }
            public bool? upwards { get; set; }
            public bool? downwards { get; set; }
        }
        public class Ppo
        {
            public bool? applied { get; set; }
            public bool? signalIntersection { get; set; }
            public int? above { get; set; }
            public int? below { get; set; }
            public bool? signalAbove { get; set; }
            public bool? signalBelow { get; set; }
        }
        public class Rsi
        {
            public bool? applied { get; set; }
            public int? above { get; set; }
            public int? below { get; set; }
        }
        public class Stddev
        {
            public bool? applied { get; set; }
            public int? days { get; set; }
            
        }   
        public class Stoch
        {
            public bool? applied { get; set; }
            public int? above { get; set; }
            public int? below { get; set; }
        }
        public class Vwap
        {
            public bool? applied { get; set; }
            public string nil { get; set; }
            public int? days { get; set; }
            public int? percent { get; set; }
        }
        public class Mfi
        {
            public bool? applied { get; set; }
            public int? above { get; set; }
            public int? below { get; set; }
        }
        public class Sma
        {
            public bool? applied { get; set; }
            public int? above { get; set; }
            public int? below { get; set; }
            public int? intersection1 { get; set; }
            public int? intersection2 { get; set; }
        }
        public class Ema
        {
            public bool? applied { get; set; }
            public int? above { get; set; }
            public int? below { get; set; }
            public int? intersection1 { get; set; }
            public int? intersection2 { get; set; }
        }
        public class StopLoss
        {
            public bool? active { get; set; }
            public double? percentValue { get; set; }
            public string type { get; set; }

        }


        public class Alerts
        {
            public string algorithmCode { get; set; }
            public string tickerId { get; set; }
            public double buyPrice { get; set; }
            public double sellPrice { get; set; }
            public double stopPrice { get; set; }
            public string signalType { get; set; }
            public double bearBullRating { get; set; }
        }





        public async Task<string> PullBacktestAlgo(string accessToken)
        {
            try
            {
                var client = new HttpClient();
                client.BaseAddress = new Uri(MarketPlaceConstants.BASE_URL);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);
                HttpResponseMessage response = await client.GetAsync(MarketPlaceConstants.PULL_BACKTEST_DATA);
                if (response.IsSuccessStatusCode)
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                    return responseString;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return null;
        }

        public async Task<string> PullLeaseData(string accessToken)
        {
            try
            {
                var client = new HttpClient();
                client.BaseAddress = new Uri(MarketPlaceConstants.BASE_URL);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);
                HttpResponseMessage response = await client.GetAsync(MarketPlaceConstants.PULL_LEASE_DATA);
                if (response.IsSuccessStatusCode)
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                    return responseString;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return null;
        }

        public async Task<string> PushStock(string accessToken, StockObject stock)
        {
            try
            {
                var client = new HttpClient();
                client.BaseAddress = new Uri(MarketPlaceConstants.BASE_URL);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                string json = JsonConvert.SerializeObject(stock);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                HttpResponseMessage response = (await client.PostAsync( MarketPlaceConstants.PUSH_STOCK, content));
                if (response.IsSuccessStatusCode)
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                    return responseString;
                }
                else
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                    return "AN ERROR OCCURED ALERT NOT PUSHED ONTO THE SERVER";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return null;
        }


        public async Task<string> CheckStock(string stock)
        {
            try
            {
                var client = new HttpClient();
                client.BaseAddress = new Uri(MarketPlaceConstants.BASE_URL);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("Authorization", MarketPlaceConstants.ROHITBEARERTOKEN);
                HttpResponseMessage response = await client.GetAsync(MarketPlaceConstants.GET_STOCK+ stock.ToUpper() );
                if (response.IsSuccessStatusCode)
                {
                    var responseString = JObject.Parse(await response.Content.ReadAsStringAsync());
                    return responseString.ToString() ;
                }
                else
                {
                    
                    var responseString = JObject.Parse(await response.Content.ReadAsStringAsync());
                    if (response.StatusCode.ToString() == "NotFound")
                    {
                        return null;
                    }
                    else {
                        return "An Error Occured";
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return null;
        }


        public async Task<string> CheckMF(string mutualFund)
        {
            try
            {
                var client = new HttpClient();
                client.BaseAddress = new Uri(MarketPlaceConstants.BASE_URL);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("Authorization", MarketPlaceConstants.ROHITBEARERTOKEN);
                HttpResponseMessage response = await client.GetAsync(MarketPlaceConstants.GET_MF + mutualFund.ToUpper());
                if (response.IsSuccessStatusCode)
                {
                    var responseString = JObject.Parse(await response.Content.ReadAsStringAsync());
                    JArray jArray = JArray.Parse(responseString["mutualFunds"].ToString());
                    if (jArray.Count > 0)
                    {
                        return responseString.ToString();
                    }
                    else 
                    {
                        return null;
                    }
                }
                else
                {

                    var responseString = JObject.Parse(await response.Content.ReadAsStringAsync());
                    if (response.StatusCode.ToString() == "NotFound")
                    {
                        return null;
                    }
                    else
                    {
                        return "An Error Occured";
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return null;
        }




        public async Task<string> PushMutualFund(string accessToken, MutualFundObject mutualFund)
        {
            try
            {

                var client = new HttpClient();
                client.BaseAddress = new Uri(MarketPlaceConstants.BASE_URL);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                string json = JsonConvert.SerializeObject(mutualFund);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                HttpResponseMessage response = (await client.PostAsync(MarketPlaceConstants.PUSH_MF, content));
                if (response.IsSuccessStatusCode)
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                    return responseString;
                }
                else
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                    return "AN ERROR OCCURED ALERT NOT PUSHED ONTO THE SERVER";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return "AN ERROR OCCURED ALERT NOT PUSHED ONTO THE SERVER";
        }




        public async Task<string> PushBackTest(string accessToken, BackTestObject backTestObject)
        {
            try
            {
             
                var client = new HttpClient();
                client.BaseAddress = new Uri(MarketPlaceConstants.BASE_URL );
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);
                string json = JsonConvert.SerializeObject(backTestObject);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                HttpResponseMessage response = (await client.PostAsync(MarketPlaceConstants.PUSH_BACKTEST_DATA, content));
                if (response.IsSuccessStatusCode)
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                    return responseString;
                }
                else
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                    var obj = JObject.Parse(responseString);
                    if (obj["message"].ToString() == "Backtest updated, algorithm not updated, looks like moved to a new version or locked")
                    {
                        return obj["message"].ToString();
                    }
                }
                return "AN ERROR OCCURED ALERT NOT PUSHED ONTO THE SERVER";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return "AN ERROR OCCURED ALERT NOT PUSHED ONTO THE SERVER";

        }

        public async Task<string> PushAlerts(string accessToken, Alerts alerts)
        {
            try
            {
                var client = new HttpClient();
                client.BaseAddress = new Uri(MarketPlaceConstants.BASE_URL);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                string json = JsonConvert.SerializeObject(alerts);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                HttpResponseMessage response = (await client.PostAsync(MarketPlaceConstants.PUSH_ALERTS, content));
                if (response.IsSuccessStatusCode)
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                    return responseString;
                }
                else
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                }
                return "AN ERROR OCCURED ALERT NOT PUSHED ONTO THE SERVER";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return "AN ERROR OCCURED ALERT NOT PUSHED ONTO THE SERVER";
        }
    }
}
