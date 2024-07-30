import React from 'react';
import Papa from 'papaparse';

function FileUpload({ onDataParsed }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      Papa.parse(file, {
        complete: (results) => {
          console.log('Raw parsed data:', results.data.slice(0, 5)); // Log first 5 rows

          const parsedData = results.data
            .map(row => ({
              user_id: row[0],
              event_type: row[1],
              timestamp: new Date(row[2])
            }))
            .filter(row => row.user_id && row.event_type && row.timestamp)
            .sort((a, b) => a.timestamp - b.timestamp);

          console.log('Processed data:', parsedData.slice(0, 5)); // Log first 5 rows

          // Calculate durations
          const dataWithDurations = [];
          let prevEventByUser = {};

          parsedData.forEach((curr) => {
            if (prevEventByUser[curr.user_id]) {
              const prev = prevEventByUser[curr.user_id];
              const duration = (curr.timestamp - prev.timestamp) / (1000 * 60 * 60 * 24); // in days
              dataWithDurations.push({ ...curr, duration });
            }
            prevEventByUser[curr.user_id] = curr;
          });

          // Calculate average durations
          const eventTypes = [...new Set(dataWithDurations.map(d => d.event_type))];
          const averageDurations = eventTypes.map(type => {
            const durations = dataWithDurations.filter(d => d.event_type === type).map(d => d.duration);
            const average = durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0;
            return { event_type: type, average_duration: average.toFixed(2) };
          });

          console.log('Average Durations:', averageDurations);

          // Convert parsed data and average durations back to CSV strings
          const csvString = Papa.unparse(dataWithDurations);
          const avgDurationsCSV = Papa.unparse(averageDurations);
          console.log('CSV string length:', csvString.length);
          console.log('Average durations CSV:', avgDurationsCSV);
          onDataParsed(csvString, avgDurationsCSV);
        },
        header: false,
        error: (error) => {
          console.error('Error parsing file:', error);
        }
      });
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
}

export default FileUpload;