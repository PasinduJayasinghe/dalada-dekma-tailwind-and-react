import React, { useState, useEffect } from "react";
import AnimationSequence from "../Animation/AnimationSequence";

function WorshipServices() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "සිරි දළදා වන්දනාව සදහා පැමිණිය යුතු ආකාරය කෙසේද?",
      content: `• මේ සදහා පැමිනෙන විට ඔබ මීට අනුරෑප ඇදුමින් සැරසී පැමිණිය යුතු අතර අනවශ්‍ය දෑ රැගෙන නොඒමට කාරුණික වන්න.එ‌මෙන්ම මාලිගා පරිශ්‍රයේදී හා ඉන් පිටතදී ඔබ විනීතව හැසිරීමට කටයුතු කරන්න.
      • පොලිතීන්, ප්ලාසේටික් වැනි පූජා භූමියට හානිකර ද්‍රවය රැගෙන ඒමෙන් වළකින්න.
      • පොලිතින් බෑග් හෝ ප්ලාසේටික් බදුන් වල පූජා ද්‍රවය රැගෙන ඒකමන් වලකින්න.`
    },
    {
      id: 2,
      title: "සිරි දළදා වන්දනාව සදහා පැමිණිය හැකි පිවිසුම් මොනවද?",
      content: `• මේ සදහා ඔබට පිවිසුම් 03 ක් ඇති අතර ඔබට මහයියාව දෙසින් දළදා මාලිගාව දෙසට, රතු බෝක්කුව දෙසින් වැව රවුම හරහා දළදා මාලිගාවට සහ රතු කබෝක්කුවේ සිට දළදා මාලිගාවට යන පෝලිම් මීට භාවිතා කල හැක.`
    },
    {
      id: 3,
      title: "සිරි දළදා වන්දනාවට පැමිනෙන විට ගමන් මලු රැගෙන පැමිණිය හැකිද?",
      content: `• නොහැක. ඔබ දළදා වහන්කසේට පූජා කිරීමට රැගෙන පැමිනෙන දෙයක් හෝ ඔබට අතයවශ්‍යම වන දෑ (ඖෂධ,සනීපාරක්ෂක ද්‍රවයයන් වැනි..) පමෙක් රැගෙන ඒමට හැකියාවක් පවතී.`
    },
    {
      id: 4,
      title: "ශ්‍රී දළදා මාළිගා පරිශ්‍රය තුළ වාහන නැවැත්වවිය හැකිද?",
      content: `• නොහැක. ඒ සඳහා මහනුවර රථගාල හෝ වෙනත් සුදුසු ස්ථානයක් ඔබට භාවිතා කිරීමට සිදුවේ.`
    },
    {
      id: 5,
      title: "ඡායාරූප හෝ වීඩියෝ පට ලබාගත හැකිද?",
      content: `• ශ්‍රී දළදා මාලිගා පරිශ්‍රකයෙන් පිට ඔබට ඡායාරූප හෝ වීඩියෝ පට ලබාගත හැකි අතර ඉන් පසුව දළදා මාලිගාව අභයන්තරයට ඇතුල්වූ පසු ඔබ අනිවාර්යකයන්ම ඔබගේ ජංගම දුරකථනය ක්‍රියා විරහිත කළ යුතුය.`
    },
    {
      id: 6,
      title: "සිරි දළදා වන්දනාව පැවැත්වවෙන දිනයන් තුළ දළදා වහන්කසේ වන්දනා කිරීමට පැමිණිය හැකිද?",
      content: `• මේ සඳහා ඔබට හැකියාව පවතින අතර සිරි දළදා වන්දනාව පැවැත්වවෙන වේලාවන් වලින් තොර වේලාවක පැමිණීමට කාරුණික වන්න.`
    },
    {
      id: 7,
      title: "සිරි දළදා වන්දනාවට පැමිකෙන මා හට නවාතැන් පහසුකේ ලබා ගැනීමට හැකිද?",
      content: `• ඔබට අතයවශ්‍යම නම් පමණක් හෝ වැඩිහිිටි හෝ ආබාධිත පුද්ගලයෙක් නම් පමණක් ඔබට නවාතැන් පහසුකම් ලබාගත හැක. මේ සඳහා ඔබට කැප්පෙටිපොළ විදුහල සහ විකේකානන්ද විදුහල භාවිතා කළ හැක.`
    }
  ]);

  return (
    <div>
      <h2 className="text-4xl font-semibold mb-4 border-b pb-2 text-white border-amber-300 text-center" style={{ fontFamily: "FMBindumathi" }}>
        {'ks;r wik mek'}
        {/* නිතර අසන පැනපැන */}
      </h2>
      {questions.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-transform:lowercase">
          No frequently asked questions available at the moment.
        </div>
      ) : (
        <div className="p-4">
          <AnimationSequence 
            direction="right" 
            baseDelay={100} 
            staggerDelay={150} 
            duration={800} 
            distance={30} 
            easing="ease-out"
            className="contents"
          >
            {questions.map((question) => (
              <ul key={question.id}>
                <div className="text-white" style={{ fontFamily: "NotoSansSinhala" }}>
                  <li><h3 className="text-lg font-bold mb-2">{question.title}</h3></li>
                  <p className="whitespace-pre-line">{question.content}</p>
                  <br />
                </div>
              </ul>
            ))}
          </AnimationSequence>
        </div>
      )}
    </div>
  );
}

export default WorshipServices;