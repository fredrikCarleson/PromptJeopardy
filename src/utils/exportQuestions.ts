import { TOPIC_LABELS, TILES } from '../data/tiles';

export const buildQuestionsPlainText = (): string => {
  const groupedByTopic = TILES.reduce<Record<string, typeof TILES>>((acc, tile) => {
    (acc[tile.topic] ??= []).push(tile);
    return acc;
  }, {});

  const lines: string[] = [
    'Prompt-Jeopardy - Alla frågor',
    '================================',
    '',
    `Antal uppgifter: ${TILES.length}`,
    `Total poäng: ${TILES.reduce((sum, tile) => sum + tile.points, 0)}`,
    '',
  ];

  Object.entries(groupedByTopic).forEach(([topic, tiles]) => {
    const sorted = [...tiles].sort((a, b) => a.points - b.points);
    lines.push(`Kategori: ${TOPIC_LABELS[topic as keyof typeof TOPIC_LABELS] ?? topic}`);
    lines.push('-'.repeat(40));
    sorted.forEach((tile, index) => {
      lines.push(`Uppgift ${index + 1} - ${tile.points} poäng`);
      lines.push(`Titel: ${tile.title}`);
      lines.push(`Kort etikett: ${tile.shortLabel}`);
      lines.push(`Verktyg: ${tile.toolFocus}`);
      lines.push(`Appfokus: ${tile.appFocus}`);
      lines.push(`Lärandemål: ${tile.learningGoal}`);
      lines.push(`Avgränsa källan: ${tile.sourceInstruction}`);
      lines.push(`Uppgift: ${tile.task}`);
      lines.push('Reflektionsfrågor:');
      tile.verbalPresentationPrompt.forEach((prompt, promptIndex) => {
        lines.push(`  ${promptIndex + 1}. ${prompt}`);
      });
      lines.push('');
    });
    lines.push('');
  });

  return lines.join('\n');
};

export const downloadQuestionsAsText = (): void => {
  const content = buildQuestionsPlainText();
  const timestamp = new Date().toISOString().slice(0, 10);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `prompt-jeopardy-fragor-${timestamp}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
