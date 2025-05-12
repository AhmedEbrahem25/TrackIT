import React, { useState, useEffect, useRef } from 'react';
import './../Style/RoadMap.css';

const MindMap = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [showNodeDetails, setShowNodeDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const modalRef = useRef(null);
  
  // Load saved favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('osint-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    const savedRecentlyViewed = localStorage.getItem('osint-recent');
    if (savedRecentlyViewed) {
      setRecentlyViewed(JSON.parse(savedRecentlyViewed));
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('osint-theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);
  
  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('osint-favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  // Save recently viewed to localStorage when they change
  useEffect(() => {
    localStorage.setItem('osint-recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);
  
  // Save theme preference
  useEffect(() => {
    localStorage.setItem('osint-theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);
  
  // Add click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowNodeDetails(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  const categories = [
    {
      name: "Username",
      children: [
        { name: "NameChk", url: "https://namechk.com", description: "Check username availability across multiple platforms" },
        { name: "WhatsMyName", url: "https://whatsmyname.app", description: "Username search tool for various platforms" },
        { name: "UserSearch.org", url: "https://usersearch.org", description: "Find people by username across social networks" },
        { name: "NameCheckup", url: "https://namecheckup.com", description: "Username availability checker" }
      ],
      description: "Tools to search and analyze usernames across multiple platforms",
      icon: "👤"
    },
    {
      name: "Username",
      children: [
        { name: "NameChk", url: "https://namechk.com", description: "Check username availability across multiple platforms" },
        { name: "WhatsMyName", url: "https://whatsmyname.app", description: "Username search tool for various platforms" },
        { name: "UserSearch.org", url: "https://usersearch.org", description: "Find people by username across social networks" },
        { name: "NameCheckup", url: "https://namecheckup.com", description: "Username availability checker" }
      ],
      description: "Tools to search and analyze usernames across multiple platforms"
    },
    {
        name: "Email Address",
        children: [
          { name: "Hunter.io", url: "https://hunter.io", description: "Email finder and verifier" },
          { name: "EmailRep", url: "https://emailrep.io", description: "Simple email reputation lookup service" },
          { name: "That's Them", url: "https://thatsthem.com/email-lookup", description: "Reverse email lookup" },
          { name: "Have I Been Pwned", url: "https://haveibeenpwned.com", description: "Check if email has been compromised in data breaches" }
        ],
        description: "Tools to verify, validate and investigate email addresses",
        icon: "✉️"
      },
      {
        name: "Domain Name",
        children: [
          { name: "WHOIS Lookup", url: "https://whois.domaintools.com", description: "Domain registration information lookup" },
          { name: "Shodan", url: "https://www.shodan.io", description: "Search engine for Internet-connected devices" },
          { name: "SecurityTrails", url: "https://securitytrails.com", description: "DNS, domain and IP historical data" },
          { name: "BuiltWith", url: "https://builtwith.com", description: "Find out what websites are built with" }
        ],
        description: "Tools to analyze domain names, ownership and technical details",
        icon: "🌐"
      },
    {
      name: "IP & MAC Address",
      children: [
        { name: "IPinfo", url: "https://ipinfo.io", description: "Comprehensive IP address data" },
        { name: "AbuseIPDB", url: "https://www.abuseipdb.com", description: "Check if an IP has been reported for abuse" },
        { name: "IP Location", url: "https://iplocation.net", description: "Find geolocation information for IP addresses" },
        { name: "MAC Lookup", url: "https://maclookup.app", description: "Find vendor information from MAC addresses" }
      ],
      description: "Tools to investigate IP and MAC addresses"
    },
    {
      name: "Images / Videos / Docs",
      children: [
        { name: "TinEye", url: "https://tineye.com", description: "Reverse image search engine" },
        { name: "Google Images", url: "https://images.google.com", description: "Image search and reverse image search" },
        { name: "Metadata2Go", url: "https://www.metadata2go.com", description: "Extract metadata from files" },
        { name: "ExifTool", url: "https://exiftool.org", description: "Tool for reading metadata in files" }
      ],
      description: "Tools to search, analyze and extract data from multimedia files"
    },
    {
      name: "Social Networks",
      children: [
        { name: "Social Bearing", url: "https://socialbearing.com", description: "Twitter analytics and search" },
        { name: "Sowdust Github", url: "https://sowdust.github.io/fb-search", description: "Facebook search tool" },
        { name: "LinkedIn Search", url: "https://www.linkedin.com/search/results/people", description: "Find people on LinkedIn" },
        { name: "Instagram Explorer", url: "https://www.osintcombine.com/instagram-explorer", description: "Advanced Instagram search" }
      ],
      description: "Tools to explore and analyze social network profiles and content"
    },
    {
      name: "Instant Messaging",
      children: [
        { name: "Telegram Analytics", url: "https://tgstat.com", description: "Search and analytics for Telegram" },
        { name: "WhatsAnalyzer", url: "https://whatsanalyzer.com", description: "WhatsApp chat analyzer" },
        { name: "Discord Lookup", url: "https://discordlookup.com", description: "Discord server and user information" },
        { name: "Slack Directory", url: "https://slofile.com", description: "Directory of public Slack communities" }
      ],
      description: "Tools for analyzing instant messaging platforms and conversations"
    },
    {
      name: "People Search Engines",
      children: [
        { name: "Pipl", url: "https://pipl.com", description: "Identity verification and people search" },
        { name: "BeenVerified", url: "https://www.beenverified.com", description: "Background check and people search" },
        { name: "Spokeo", url: "https://www.spokeo.com", description: "People search for contact info and public records" },
        { name: "Intelius", url: "https://www.intelius.com", description: "Background checks and people search" }
      ],
      description: "Specialized search engines for finding people's information"
    },
    {
      name: "Dating",
      children: [
        { name: "Tinder Finder", url: "https://github.com/merrychap/tinderfinder", description: "Location spoofing to find profiles" },
        { name: "Dating Profile Search", url: "https://www.socialcatfish.com", description: "Search for dating profiles by image" },
        { name: "DatingProfileUsername", url: "https://www.spokeo.com/username", description: "Search dating sites by username" },
        { name: "Bumble Lookup", url: "https://bumble.com/spotlight", description: "Bumble profile search (limited)" }
      ],
      description: "Tools to search dating sites and apps for profiles"
    },
    {
      name: "Telephone Numbers",
      children: [
        { name: "Truecaller", url: "https://www.truecaller.com", description: "Caller ID and phone number lookup" },
        { name: "NumLookup", url: "https://www.numlookup.com", description: "Free reverse phone lookup" },
        { name: "CallerID Test", url: "https://calleridtest.com", description: "Caller ID testing and information" },
        { name: "PhoneInfoga", url: "https://github.com/sundowndev/phoneinfoga", description: "Advanced phone number information gathering" }
      ],
      description: "Tools to look up and analyze phone numbers"
    },
    {
      name: "Public Records",
      children: [
        { name: "SearchSystems", url: "https://publicrecords.searchsystems.net", description: "Free public records directory" },
        { name: "PACER", url: "https://pacer.uscourts.gov", description: "US federal court records" },
        { name: "BRB Publications", url: "https://www.brbpublications.com", description: "Public record resources" },
        { name: "Melissa Data", url: "https://www.melissa.com/v2/lookups", description: "Various public record lookups" }
      ],
      description: "Tools to access various public records"
    },
    {
      name: "Business Records",
      children: [
        { name: "OpenCorporates", url: "https://opencorporates.com", description: "Database of companies worldwide" },
        { name: "SEC EDGAR", url: "https://www.sec.gov/edgar/searchedgar/companysearch.html", description: "US securities filings" },
        { name: "D&B Business Directory", url: "https://www.dnb.com", description: "Business information and listings" },
        { name: "ZoomInfo", url: "https://www.zoominfo.com", description: "Business contact and company information" }
      ],
      description: "Tools to research businesses and corporate entities"
    },
    {
      name: "Transportation",
      children: [
        { name: "FlightRadar24", url: "https://www.flightradar24.com", description: "Real-time flight tracking" },
        { name: "MarineTraffic", url: "https://www.marinetraffic.com", description: "Real-time ship tracking" },
        { name: "VesselFinder", url: "https://www.vesselfinder.com", description: "Ship tracking and maritime information" },
        { name: "Raildar", url: "http://raildar.co.uk", description: "UK train movements in real time" }
      ],
      description: "Tools to track and analyze transportation data"
    },
    {
      name: "Geolocation Tools / Maps",
      children: [
        { name: "Google Earth", url: "https://earth.google.com", description: "3D representation of Earth" },
        { name: "SunCalc", url: "https://www.suncalc.org", description: "Sun position and phases calculator" },
        { name: "GeoGuessr", url: "https://www.geoguessr.com", description: "Geography discovery game useful for geolocation" },
        { name: "Sentinel Hub", url: "https://www.sentinel-hub.com", description: "Satellite imagery platform" }
      ],
      description: "Tools for geolocation analysis and mapping"
    },
    {
      name: "Search Engines",
      children: [
        { name: "DuckDuckGo", url: "https://duckduckgo.com", description: "Privacy-focused search engine" },
        { name: "Brave Search", url: "https://search.brave.com", description: "Private search engine" },
        { name: "Startpage", url: "https://www.startpage.com", description: "Privacy search engine" },
        { name: "Yandex", url: "https://yandex.com", description: "Russian search engine with powerful image search" }
      ],
      description: "Various search engines for information discovery"
    },
    {
      name: "Forums / Blogs / IRC",
      children: [
        { name: "BoardReader", url: "https://boardreader.com", description: "Forum search engine" },
        { name: "RedditSearch", url: "https://redditsearch.io", description: "Advanced Reddit search" },
        { name: "4plebs", url: "https://archive.4plebs.org", description: "4chan archive search" },
        { name: "SearchIRC", url: "https://searchirc.com", description: "IRC search engine" }
      ],
      description: "Tools to search forum posts, blogs and chat logs"
    },
    {
      name: "Archives",
      children: [
        { name: "Wayback Machine", url: "https://web.archive.org", description: "Internet Archive's historical website snapshots" },
        { name: "Archive.today", url: "https://archive.ph", description: "Webpage snapshot tool" },
        { name: "CachedPages", url: "http://www.cachedpages.com", description: "Search engine cached pages" },
        { name: "WebCite", url: "https://www.webcitation.org", description: "On-demand archive service" }
      ],
      description: "Tools to access archived and historical web content"
    },
    {
      name: "Language Translation",
      children: [
        { name: "DeepL", url: "https://www.deepl.com/translator", description: "AI-powered translation tool" },
        { name: "Google Translate", url: "https://translate.google.com", description: "Multi-language translation service" },
        { name: "Yandex Translate", url: "https://translate.yandex.com", description: "Translation service with Cyrillic support" },
        { name: "Linguee", url: "https://www.linguee.com", description: "Dictionary and text translator" }
      ],
      description: "Tools for translating content across languages"
    },
    {
      name: "Metadata",
      children: [
        { name: "FOCA", url: "https://github.com/ElevenPaths/FOCA", description: "Tool to extract metadata from files" },
        { name: "ExifTool", url: "https://exiftool.org", description: "Library and program to read metadata" },
        { name: "Metagoofil", url: "https://github.com/laramies/metagoofil", description: "Document metadata extraction tool" },
        { name: "BetterViewer", url: "https://chrome.google.com/webstore/detail/betterviewer/llcpfkbjgkpmafiidmhemapofnpkgfbk", description: "Image EXIF viewer extension" }
      ],
      description: "Tools to extract and analyze metadata from files"
    },
    {
      name: "Mobile Emulation",
      children: [
        { name: "Android Studio", url: "https://developer.android.com/studio", description: "Android development environment with emulation" },
        { name: "BlueStacks", url: "https://www.bluestacks.com", description: "Android emulator for PC" },
        { name: "iOS Simulator", url: "https://developer.apple.com/documentation/xcode/running-your-app-in-simulator", description: "iOS simulator for Mac" },
        { name: "BrowserStack", url: "https://www.browserstack.com", description: "Mobile browser testing platform" }
      ],
      description: "Tools to emulate mobile devices for testing"
    },
    {
      name: "Dark Web",
      children: [
        { name: "Tor Browser", url: "https://www.torproject.org", description: "Browser for accessing .onion sites" },
        { name: "DarkSearch", url: "https://darksearch.io", description: "Dark web search engine" },
        { name: "Ahmia", url: "https://ahmia.fi", description: "Tor hidden services search" },
        { name: "OnionLand Search", url: "https://onionsearchengine.com", description: "Darknet search engine" }
      ],
      description: "Tools to safely search and navigate dark web content"
    },
    {
      name: "Digital Currency",
      children: [
        { name: "Blockchain Explorer", url: "https://www.blockchain.com/explorer", description: "Bitcoin blockchain explorer" },
        { name: "Etherscan", url: "https://etherscan.io", description: "Ethereum blockchain explorer" },
        { name: "Blockchair", url: "https://blockchair.com", description: "Multi-blockchain explorer" },
        { name: "BitRef", url: "https://bitref.com", description: "Bitcoin address balance lookup" }
      ],
      description: "Tools to track and analyze cryptocurrency transactions"
    },
    {
      name: "Classifieds",
      children: [
        { name: "SearchTempest", url: "https://www.searchtempest.com", description: "Search Craigslist nationwide" },
        { name: "Oodle", url: "https://www.oodle.com", description: "Aggregator of classified listings" },
        { name: "eBay", url: "https://www.ebay.com", description: "Online auction and shopping website" },
        { name: "Facebook Marketplace", url: "https://www.facebook.com/marketplace", description: "Facebook's classified ads" }
      ],
      description: "Tools to search classified ad listings across platforms"
    },
    {
      name: "Encoding / Decoding",
      children: [
        { name: "CyberChef", url: "https://gchq.github.io/CyberChef", description: "Web app for encryption, encoding, compression" },
        { name: "Base64Decode", url: "https://www.base64decode.org", description: "Base64 encoding/decoding" },
        { name: "URL Decode", url: "https://www.urldecoder.org", description: "URL encoding/decoding" },
        { name: "Hash Toolkit", url: "https://hashtoolkit.com", description: "Hash decoding tools" }
      ],
      description: "Tools for encoding and decoding various formats"
    },
    {
      name: "Tools",
      children: [
        { name: "SpiderFoot", url: "https://www.spiderfoot.net", description: "OSINT automation tool" },
        { name: "Maltego", url: "https://www.maltego.com", description: "Interactive data mining tool" },
        { name: "theHarvester", url: "https://github.com/laramies/theHarvester", description: "Email and subdomain harvesting" },
        { name: "Recon-ng", url: "https://github.com/lanmaster53/recon-ng", description: "Web reconnaissance framework" }
      ],
      description: "General OSINT tools for various investigations"
    },
    {
      name: "AI Tools",
      children: [
        { name: "DetectGPT", url: "https://detectgpt.com", description: "AI content detection" },
        { name: "OSINT-GPT", url: "https://github.com/assafelovic/gpt-researcher", description: "AI-powered OSINT tool" },
        { name: "Bard", url: "https://bard.google.com", description: "Google's AI assistant" },
        { name: "Claude", url: "https://claude.ai", description: "Anthropic's AI assistant" }
      ],
      description: "AI-powered tools useful for OSINT investigations"
    },
    {
      name: "Malicious File Analysis",
      children: [
        { name: "VirusTotal", url: "https://www.virustotal.com", description: "File and URL analyzer" },
        { name: "Hybrid Analysis", url: "https://www.hybrid-analysis.com", description: "Free malware analysis service" },
        { name: "ANY.RUN", url: "https://any.run", description: "Interactive malware analysis" },
        { name: "Triage", url: "https://tria.ge", description: "Malware analysis sandbox" }
      ],
      description: "Tools to analyze potentially malicious files"
    },
    {
      name: "Exploits & Advisories",
      children: [
        { name: "ExploitDB", url: "https://www.exploit-db.com", description: "Archive of exploits" },
        { name: "CVE Details", url: "https://www.cvedetails.com", description: "CVE vulnerability database" },
        { name: "NVD", url: "https://nvd.nist.gov", description: "US government vulnerability database" },
        { name: "Vulners", url: "https://vulners.com", description: "Vulnerability database search engine" }
      ],
      description: "Resources for security vulnerabilities and exploits"
    },
    {
      name: "Threat Intelligence",
      children: [
        { name: "OTX AlienVault", url: "https://otx.alienvault.com", description: "Open threat exchange" },
        { name: "MISP", url: "https://www.misp-project.org", description: "Threat intelligence sharing platform" },
        { name: "ThreatConnect", url: "https://threatconnect.com", description: "Threat intelligence platform" },
        { name: "ThreatCrowd", url: "https://www.threatcrowd.org", description: "Threat search engine" }
      ],
      description: "Tools for threat intelligence gathering and analysis"
    },
    {
      name: "OpSec",
      children: [
        { name: "Mullvad VPN", url: "https://mullvad.net", description: "Privacy-focused VPN service" },
        { name: "Tails OS", url: "https://tails.boum.org", description: "Privacy-focused operating system" },
        { name: "KeePassXC", url: "https://keepassxc.org", description: "Password manager" },
        { name: "Signal", url: "https://signal.org", description: "Encrypted messaging app" }
      ],
      description: "Tools for operational security during investigations"
    },
    {
      name: "Documentation / Evidence Capture",
      children: [
        { name: "Hunchly", url: "https://www.hunch.ly", description: "Web capture tool for investigators" },
        { name: "Greenshot", url: "https://getgreenshot.org", description: "Screenshot software" },
        { name: "WebCase", url: "https://www.webcase.app", description: "Web evidence collection" },
        { name: "Obsidian", url: "https://obsidian.md", description: "Knowledge base that works on local Markdown files" }
      ],
      description: "Tools for capturing and documenting investigation evidence"
    },
    {
      name: "Training",
      children: [
        { name: "SANS FOR498", url: "https://www.sans.org/cyber-security-courses/advanced-open-source-intelligence-gathering-analysis", description: "OSINT course" },
        { name: "TryHackMe", url: "https://tryhackme.com/room/ohsint", description: "OSINT learning rooms" },
        { name: "OSINT Framework", url: "https://osintframework.com", description: "OSINT resource collection" },
        { name: "OSINTCurious", url: "https://osintcurio.us", description: "OSINT techniques and resources" }
      ],
      description: "Resources to learn OSINT techniques and methods"
    }
  ];

  const resources = [
    {
      name: "Property Records",
      children: [
        { name: "Zillow", url: "https://www.zillow.com", description: "Real estate and rental marketplace" },
        { name: "PropertyShark", url: "https://www.propertyshark.com", description: "Property research tool" },
        { name: "County Property Records", url: "https://publicrecords.netronline.com", description: "US county property records" }
      ],
      description: "Resources for property ownership and value information",
      icon: "🏠"
    },
    {
      name: "Court / Criminal Records",
      children: [
        { name: "NC Salary DB", url: "https://www.newsobserver.com/news/databases/state-pay", description: "North Carolina state employee salaries" },
        { name: "PACER", url: "https://pacer.uscourts.gov", description: "US federal court records" },
        { name: "Justia", url: "https://www.justia.com", description: "Legal information and resources" }
      ],
      description: "Resources for legal and criminal record information"
    },
    {
      name: "Government Records",
      children: [
        { name: "Gov Data Canada", url: "https://open.canada.ca/en/open-data", description: "Canadian open government data" },
        { name: "Data.gov", url: "https://www.data.gov", description: "US government data" },
        { name: "EU Open Data Portal", url: "https://data.europa.eu/en", description: "European Union open data" }
      ],
      description: "Resources for government data and records"
    },
    {
      name: "Financial / Tax Resources",
      children: [
        { name: "CA Salary DB", url: "https://transparentcalifornia.com", description: "California public employee salaries" },
        { name: "SEC EDGAR", url: "https://www.sec.gov/edgar/searchedgar/companysearch.html", description: "SEC filings" },
        { name: "OpenCorporates", url: "https://opencorporates.com", description: "Corporate data" }
      ],
      description: "Resources for financial and tax information"
    },
    {
      name: "Birth Records",
      children: [
        { name: "Sorted by Birth Date", url: "https://www.familysearch.org/en/", description: "Family history records" },
        { name: "VitalRec", url: "https://www.vitalrec.com", description: "Vital records information" },
        { name: "CDC Wonder", url: "https://wonder.cdc.gov", description: "Public health data including births" }
      ],
      description: "Resources for birth record information"
    },
    {
      name: "Death Records",
      children: [
        { name: "Find A Grave", url: "https://www.findagrave.com", description: "Cemetery records" },
        { name: "SSDI Search", url: "https://www.ancestry.com/search/collections/3693", description: "Social Security Death Index" },
        { name: "Legacy.com", url: "https://www.legacy.com", description: "Obituary database" }
      ],
      description: "Resources for death record information"
    },
    {
      name: "US Courts Data",
      children: [
        { name: "NACO County Explorer", url: "https://ce.naco.org", description: "US county data explorer" },
        { name: "Public Access to Court Electronic Records", url: "https://pacer.uscourts.gov", description: "Federal court records" },
        { name: "Court Listener", url: "https://www.courtlistener.com", description: "Legal opinions and court documents" }
      ],
      description: "Resources for US court data"
    },
    {
      name: "US Voter Records",
      children: [
        { name: "Voter Records", url: "https://www.voterrecords.com", description: "US voter records search" },
        { name: "Voter Registration Data", url: "https://www.l2political.com", description: "Voter data services" },
        { name: "State Voter Files", url: "https://www.ncsl.org/research/elections-and-campaigns/access-to-and-use-of-voter-registration-lists.aspx", description: "State voter file access information" }
      ],
      description: "Resources for US voter registration information"
    },
    {
      name: "Patent Records",
      children: [
        { name: "Google Patents", url: "https://patents.google.com", description: "Patent search engine" },
        { name: "USPTO", url: "https://www.uspto.gov/patents/search", description: "US Patent and Trademark Office search" },
        { name: "Espacenet", url: "https://worldwide.espacenet.com", description: "European Patent Office search" }
      ],
      description: "Resources for patent information"
    },
    {
      name: "US Political Records",
      children: [
        { name: "OpenSecrets", url: "https://www.opensecrets.org", description: "Money in US politics" },
        { name: "The World Bank Open Data Catalog", url: "https://data.worldbank.org", description: "World Bank data catalog" },
        { name: "BRB Public Records", url: "https://www.brbpublications.com", description: "Public record resources" },
        { name: "GOVDATA - Das Datenportal für Deutschland", url: "https://www.govdata.de", description: "German government data" },
        { name: "Open-Data-Portal München", url: "https://opendata.muenchen.de", description: "Munich open data portal" }
      ],
      description: "Resources for political and campaign information"
    }
  ];


  // Filter function for search
  const filterBySearch = (items) => {
    if (!searchTerm.trim()) return items;
    
    return items.filter(item => {
      // Check if the item name or description matches
      if (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return true;
      }
      
      // Check if any child items match
      if (item.children) {
        return item.children.some(child => 
          child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (child.description && child.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      return false;
    });
  };

  const handleNodeClick = (node, isResource = false) => {
    setActiveNode({ ...node, isResource });
    setShowNodeDetails(true);
    
    // Add to recently viewed if not already there
    setRecentlyViewed(prev => {
      const exists = prev.some(item => item.name === node.name);
      if (!exists) {
        // Keep only last 5 items
        return [{ name: node.name, isResource }, ...prev.slice(0, 4)];
      }
      return prev;
    });
  };

  const handleCloseDetails = () => {
    setShowNodeDetails(false);
  };
  
  const toggleFavorite = (tool) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.name === tool.name && item.url === tool.url);
      if (exists) {
        return prev.filter(item => !(item.name === tool.name && item.url === tool.url));
      } else {
        return [...prev, tool];
      }
    });
  };
  
  const isFavorite = (tool) => {
    return favorites.some(item => item.name === tool.name && item.url === tool.url);
  };

  const renderNodeDetails = () => {
    if (!activeNode || !showNodeDetails) return null;

    return (
      <div className={`node-details-overlay ${darkMode ? 'dark' : ''}`}>
        <div className="node-details" ref={modalRef}>
          <div className="node-details-header">
            <h2>{activeNode.icon && <span className="node-icon">{activeNode.icon}</span>} {activeNode.name}</h2>
            <button className="close-button" onClick={handleCloseDetails}>×</button>
          </div>
          <div className="node-details-content">
            {activeNode.description && <p className="node-description">{activeNode.description}</p>}
            {activeNode.children && activeNode.children.length > 0 && (
              <div className="tools-list">
                <h3>Available Tools</h3>
                <ul>
                  {activeNode.children.map((tool, idx) => (
                    <li key={idx} className="tool-item">
                      <div className="tool-header">
                        <strong>{tool.name}</strong>
                        <button 
                          className={`favorite-button ${isFavorite(tool) ? 'favorited' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(tool);
                          }}
                        >
                          {isFavorite(tool) ? '★' : '☆'}
                        </button>
                      </div>
                      <p>{tool.description}</p>
                      {tool.url && (
                        <a href={tool.url} target="_blank" rel="noopener noreferrer" className="tool-link">
                          Visit Tool
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderNode = (node, index, isResource = false) => {
    const hasChildren = node.children && node.children.length > 0;
    
    return (
      <div key={index} className="node-container">
        <div 
          className={`node ${isResource ? 'resource-node' : 'category-node'} ${hasChildren ? 'has-children' : ''}`}
          onClick={() => handleNodeClick(node, isResource)}
        >
          {node.icon && <span className="node-icon">{node.icon}</span>}
          <span className="node-name">{node.name}</span>
          <div className="node-info-icon">ⓘ</div>
        </div>
        {hasChildren && 
          <div className="children-container">
            {node.children.slice(0, 2).map((child, childIndex) => (
              <div key={childIndex} className="child-connection">
                <div className="connection-line"></div>
                <div 
                  className="node endpoint-node"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNodeClick(child, isResource);
                  }}
                >
                  <span>{child.name}</span>
                </div>
              </div>
            ))}
            {node.children.length > 2 && (
              <div className="child-connection">
                <div className="connection-line"></div>
                <div 
                  className="node endpoint-node more-node"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNodeClick(node, isResource);
                  }}
                >
                  <span>+{node.children.length - 2} more</span>
                </div>
              </div>
            )}
          </div>
        }
      </div>
    );
  };
  
  const renderFavorites = () => {
    if (favorites.length === 0) return null;
    
    return (
      <div className="favorites-section">
        <h3>Favorites</h3>
        <div className="favorites-container">
          {favorites.map((tool, index) => (
            <div key={index} className="favorite-item">
              <a href={tool.url} target="_blank" rel="noopener noreferrer">
                {tool.name}
              </a>
              <button 
                className="remove-favorite" 
                onClick={() => toggleFavorite(tool)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderRecentlyViewed = () => {
    if (recentlyViewed.length === 0) return null;
    
    return (
      <div className="recent-section">
        <h3>Recently Viewed</h3>
        <div className="recent-container">
          {recentlyViewed.map((item, index) => {
            // Find the full node data
            const collection = item.isResource ? resources : categories;
            const nodeData = collection.find(node => node.name === item.name);
            
            return nodeData ? (
              <div 
                key={index} 
                className="recent-item"
                onClick={() => handleNodeClick(nodeData, item.isResource)}
              >
                {nodeData.icon && <span className="node-icon">{nodeData.icon}</span>}
                {item.name}
              </div>
            ) : null;
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`mind-map-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="map-header">
        <h1>Resource Navigator</h1>
        <div className="controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search tools, categories, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button 
            className="theme-toggle" 
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
      
      <div className="disclaimer">
        <small>*Click on any node for details and available tools</small>
      </div>
      
      {renderFavorites()}
      {renderRecentlyViewed()}
      
      <div className="mind-map">
        <div className="categories-column">
          <h2 className="column-title">Categories</h2>
          {filterBySearch(categories).map((category, index) => renderNode(category, index))}
        </div>
        
        <div className="resources-column">
          <h2 className="column-title">Public Records</h2>
          {filterBySearch(resources).map((resource, index) => renderNode(resource, index, true))}
        </div>
      </div>
      
      {renderNodeDetails()}
      
      <div className="notes-section">
        <h3>Notes</h3>
        <p>This mind map provides an overview of OSINT (Open Source Intelligence) resources categorized by information types. Click on any node to see details and available tools for that category.</p>
        <p>OSINT refers to intelligence collected from publicly available sources, including internet, mass media, professional and academic publications, and public data.</p>
        <p><strong>Important:</strong> Always ensure compliance with applicable laws and terms of service when using these tools for investigations.</p>
        <p>This tool is for educational and research purposes only.</p>
      </div>
    </div>
  );
};

export default MindMap;