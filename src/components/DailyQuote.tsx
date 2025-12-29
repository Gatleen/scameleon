import React, { useEffect, useState } from "react";
import { Box, Card, CardBody, HStack, Text, Spinner } from "@chakra-ui/react";
import { Star } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const LOCAL_QUOTES_KEY = "scameleon_quotes_cache";
const LOCAL_DAILY_KEY = "scameleon_daily_quote";

function dayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

const DailyQuoteCard: React.FC = () => {
  const [quote, setQuote] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: number;

    async function fetchQuote() {
      try {
        const todayStr = new Date().toISOString().split("T")[0];

        // 1) Check daily cached quote
        const dailyCachedRaw = localStorage.getItem(LOCAL_DAILY_KEY);
        if (dailyCachedRaw) {
          try {
            const dailyCached = JSON.parse(dailyCachedRaw);
            if (dailyCached?.date === todayStr && dailyCached?.quote) {
              setQuote(dailyCached.quote);
              setLoading(false);
              scheduleNextUpdate();
              return;
            }
          } catch {}
        }

        // 2) Check cached quotes array
        let quotes: string[] | null = null;
        const cachedRaw = localStorage.getItem(LOCAL_QUOTES_KEY);
        if (cachedRaw) {
          try {
            const cached = JSON.parse(cachedRaw);
            if (Array.isArray(cached.quotes) && cached.quotes.length > 0) {
              quotes = cached.quotes;
            }
          } catch {}
        }

        // 3) Fetch from Firestore if not cached
        if (!quotes) {
          const colRef = collection(db, "quotes");
          // console.log("Fetching quotes from Firestore...");
          const snap = await getDocs(colRef);

          quotes = snap.docs.map((doc) => doc.data().text).filter(Boolean);

          if (quotes.length > 0) {
            localStorage.setItem(
              LOCAL_QUOTES_KEY,
              JSON.stringify({ quotes, fetchedAt: new Date().toISOString() })
            );
          }
        }

        // 4) Fallback if no quotes
        if (!quotes || quotes.length === 0) {
          const fallback = "Stay safe online — be curious, be careful.";
          setQuote(fallback);
          localStorage.setItem(
            LOCAL_DAILY_KEY,
            JSON.stringify({ date: todayStr, quote: fallback })
          );
          setLoading(false);
          scheduleNextUpdate();
          return;
        }

        // 5) Deterministic quote for today
        const index = dayOfYear(new Date()) % quotes.length;
        const todaysQuote = quotes[index];

        if (!cancelled) {
          setQuote(todaysQuote);
          localStorage.setItem(
            LOCAL_DAILY_KEY,
            JSON.stringify({ date: todayStr, quote: todaysQuote })
          );
        }
      } catch (err) {
        console.error("DailyQuote error:", err);
        if (!cancelled) setQuote("Stay safe online — be curious, be careful.");
      } finally {
        if (!cancelled) {
          setLoading(false);
          scheduleNextUpdate();
        }
      }
    }

    function scheduleNextUpdate() {
      const now = new Date();
      const nextMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0,
        0
      );
      const msUntilMidnight = nextMidnight.getTime() - now.getTime();
      timeoutId = window.setTimeout(fetchQuote, msUntilMidnight);
    }

    fetchQuote();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  if (loading) return <Spinner color="yellow.500" />;

  return (
    <Card
      background="#f8eda6"
      borderLeft="6px"
      borderColor="#f8d031ff"
      shadow="md"
      width="100%"
    >
      <CardBody py={3} px={4}>
        <HStack spacing={4} alignItems="flex-start">
          <Box pt={1}>
            <Star size={20} color="#e2c637ff" fill="#e2c637ff" />
          </Box>
          <Box flex="1">
            <Text
              color="black"
              fontSize="xs"
              fontWeight="bold"
              mb={0}
              textTransform="uppercase"
              opacity={0.7}
              letterSpacing="wide"
            >
              Daily Scam Safety Quote
            </Text>
            <Text
              color="gray.800"
              fontStyle="italic"
              fontSize={{ base: "md", md: "lg" }}
              lineHeight="short"
            >
              "{quote}"
            </Text>
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default DailyQuoteCard;
